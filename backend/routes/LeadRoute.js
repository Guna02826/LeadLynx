import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../controller/leadController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("").all(protect).get(getLeads).post(createLead);
router.route("/:id").all(protect).put(updateLead).delete(deleteLead);

export default router;
