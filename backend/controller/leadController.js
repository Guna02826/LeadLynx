import { Lead } from "../models/leadModel.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get all leads for the authenticated user
 * @route   GET /api/leads
 * @access  Private
 */
export const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({ owner: req.user._id });
  return successResponse(res, leads, "Leads retrieved successfully");
});

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private
 */
export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create({ ...req.body, owner: req.user._id });
  return successResponse(res, lead, "New lead created successfully", 201);
});

/**
 * @desc    Update an existing lead
 * @route   PUT /api/leads/:id
 * @access  Private
 */
export const updateLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findById(id);

  if (!lead) {
    return errorResponse(res, "Lead not found", 404);
  }

  if (lead.owner.toString() !== req.user._id.toString()) {
    return errorResponse(res, "Not authorized to modify this lead", 403);
  }

  const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
  return successResponse(res, updatedLead, "Lead updated successfully");
});

/**
 * @desc    Delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Private
 */
export const deleteLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findById(id);

  if (!lead) {
    return errorResponse(res, "Lead not found", 404);
  }

  if (lead.owner.toString() !== req.user._id.toString()) {
    return errorResponse(res, "Not authorized to delete this lead", 403);
  }

  await Lead.findByIdAndDelete(id);
  return successResponse(res, null, "Lead deleted successfully");
});
