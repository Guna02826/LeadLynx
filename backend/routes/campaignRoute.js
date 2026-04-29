import express from "express";
import { body } from "express-validator";
import {
  getCampaign,
  createCampaign,
  sendCampaign,
} from "../controller/campaignController.js";
import protect from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validatorMiddleware.js";

const router = express.Router();

router
  .route("")
  .all(protect)
  .get(getCampaign)
  .post(
    [
      body("title").notEmpty().withMessage("Campaign title is required"),
      body("subject").notEmpty().withMessage("Email subject is required"),
      body("text").notEmpty().withMessage("Email body is required"),
    ],
    validateRequest,
    createCampaign
  );

router.route("/:id/send").all(protect).post(sendCampaign);

export default router;
