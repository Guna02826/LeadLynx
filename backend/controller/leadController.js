import { Lead } from "../models/leadModel.js";

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ owner: req.user._id });
    res.status(200).json(leads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot retrieve Lead", error: error.message });
  }
};

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ message: "Created new lead", lead: lead });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot create Lead", error: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const id = req.params.id;
    const exists = await Lead.findById(id);
    if (!exists)
      return res.status(404).json({ message: "No such Lead Exists" });

    if (exists.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to modify this lead" });
    }

    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ message: "Updated Lead", lead: lead });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot update the Lead", error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const id = req.params.id;

    const exists = await Lead.findById(id);

    if (!exists)
      return res.status(404).json({ message: "No such Lead Exists" });

    if (exists.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to modify this lead" });
    }

    const lead = await Lead.findByIdAndDelete(id);

    res.status(200).json({ message: "Lead Successfully Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot Delete the Lead", error: error.message });
  }
};
