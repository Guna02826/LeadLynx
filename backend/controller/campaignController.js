import { Campaign } from "../models/campaignModel.js";
import { Lead } from "../models/leadModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Get all campaigns for the authenticated user
 * @route   GET /api/campaigns
 * @access  Private
 */
export const getCampaign = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ owner: req.user._id });
  // We keep the 'campaign' key to minimize frontend changes for now, 
  // but wrap it in our success utility.
  return successResponse(res, { campaign: campaigns }, "Campaigns fetched successfully");
});

/**
 * @desc    Create a new campaign
 * @route   POST /api/campaigns
 * @access  Private
 */
export const createCampaign = asyncHandler(async (req, res) => {
  const { title, subject, text, status } = req.body;

  const leads = await Lead.find({ owner: req.user.id });
  const leadsIds = leads.map((lead) => lead._id);

  const campaign = await Campaign.create({
    title, 
    subject, 
    text, 
    status,
    owner: req.user.id,
    leads: leadsIds,
  });

  return successResponse(res, { campaign }, "Campaign created successfully", 201);
});

/**
 * @desc    Send emails for a specific campaign
 * @route   POST /api/campaigns/send/:id
 * @access  Private
 */
export const sendCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const failedEmails = [];

  const campaign = await Campaign.findById(id).populate("leads");

  if (!campaign) {
    return errorResponse(res, "Campaign not found", 404);
  }

  if (campaign.owner.toString() !== req.user._id.toString()) {
    return errorResponse(res, "Not authorized to send this campaign", 403);
  }

  if (!campaign.leads || campaign.leads.length === 0) {
    return errorResponse(res, "No leads assigned to this campaign", 400);
  }

  // Personalization logic
  for (const lead of campaign.leads) {
    try {
      const personalizedSubject = campaign.subject
        .replace(/{name}/g, lead.name || "")
        .replace(/{company}/g, lead.company || "");
      const personalizedText = campaign.text
        .replace(/{name}/g, lead.name || "")
        .replace(/{company}/g, lead.company || "");

      await sendEmail(lead.email, personalizedSubject, personalizedText);
    } catch (err) {
      console.error(`Failed to send email to ${lead.email}:`, err.message);
      failedEmails.push(lead.email);
    }
  }

  campaign.status = "sent";
  await campaign.save();

  if (failedEmails.length > 0) {
    return successResponse(res, {
      failedEmails,
      failedCount: failedEmails.length
    }, `Campaign sent with some errors. Failed: ${failedEmails.join(", ")}`);
  }

  return successResponse(res, null, "All emails sent successfully");
});

/**
 * @desc    Update a campaign
 * @route   PUT /api/campaigns/:id
 * @access  Private
 */
export const updateCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    return errorResponse(res, "Campaign not found", 404);
  }

  if (campaign.owner.toString() !== req.user._id.toString()) {
    return errorResponse(res, "Not authorized to update this campaign", 403);
  }

  const { title, subject, text, status } = req.body;
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (subject !== undefined) updateData.subject = subject;
  if (text !== undefined) updateData.text = text;
  if (status !== undefined) updateData.status = status;

  const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, { new: true });
  return successResponse(res, { campaign: updatedCampaign }, "Campaign updated successfully");
});

/**
 * @desc    Delete a campaign
 * @route   DELETE /api/campaigns/:id
 * @access  Private
 */
export const deleteCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    return errorResponse(res, "Campaign not found", 404);
  }

  if (campaign.owner.toString() !== req.user._id.toString()) {
    return errorResponse(res, "Not authorized to delete this campaign", 403);
  }

  await Campaign.findByIdAndDelete(id);
  return successResponse(res, null, "Campaign deleted successfully");
});
