import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String },
  status: { type: String, default: "New" },
  leads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lead" }],
});

export const Campaign = mongoose.model("Campaign", campaignSchema);
