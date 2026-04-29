import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  status: { type: String, default: "New" },
  source: { type: String, default: "Manual" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Lead = mongoose.model("Lead", leadSchema);
