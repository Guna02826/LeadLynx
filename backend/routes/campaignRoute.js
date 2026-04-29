import express from "express";
import { body } from "express-validator";
import {
  getCampaign,
  createCampaign,
  sendCampaign,
  updateCampaign,
  deleteCampaign,
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

router
  .route("/:id")
  .all(protect)
  .put(
    [
      body("title").optional().notEmpty().withMessage("Campaign title is required"),
      body("subject").optional().notEmpty().withMessage("Email subject is required"),
      body("text").optional().notEmpty().withMessage("Email body is required"),
    ],
    validateRequest,
    updateCampaign
  )
  .delete(deleteCampaign);

export default router;
