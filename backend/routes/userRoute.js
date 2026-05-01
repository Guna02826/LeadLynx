import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, demoLogin, logoutUser, getMe } from "../controller/userController.js";
import { validateRequest } from "../middleware/validatorMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginUser
);

router.post("/demo-login", demoLogin);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;
