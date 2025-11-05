import express from "express";
import { getCampaign, createCampaign, sendCampaign } from "../controller/campaignController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("").all(protect).get(getCampaign).post(createCampaign);
router.route("/:id/send").all(protect).post(sendCampaign);

export default router;
