import express from "express";
import { body } from "express-validator";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../controller/leadController.js";
import protect from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validatorMiddleware.js";

const router = express.Router();

router
  .route("")
  .all(protect)
  .get(getLeads)
  .post(
    [
      body("name").notEmpty().withMessage("Lead name is required"),
      body("email").isEmail().withMessage("Please provide a valid email"),
      body("company").notEmpty().withMessage("Company name is required"),
      body("source").optional().isString(),
      body("status")
        .optional()
        .isIn(["New", "Contacted", "Qualified", "Disqualified"])
        .withMessage("Invalid status"),
    ],
    validateRequest,
    createLead
  );

router
  .route("/:id")
  .all(protect)
  .put(
    [
      body("name").optional().notEmpty().withMessage("Name cannot be empty"),
      body("email").optional().isEmail().withMessage("Please provide a valid email"),
      body("company").optional().notEmpty().withMessage("Company cannot be empty"),
      body("source").optional().isString(),
      body("status")
        .optional()
        .isIn(["New", "Contacted", "Qualified", "Disqualified"])
        .withMessage("Invalid status"),
    ],
    validateRequest,
    updateLead
  )
  .delete(deleteLead);

export default router;
