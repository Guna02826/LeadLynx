import { Campaign } from "../models/campaignModel.js";
import { Lead } from "../models/leadModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.find({ owner: req.user._id });
    res.status(200).json({ campaign: campaign });
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch campaigns" });
  }
};

export const createCampaign = async (req, res) => {
  try {
    const leads = await Lead.find({ owner: req.user.id });
    const leadsIds = leads.map((lead) => lead._id);

    const campaign = await Campaign.create({
      ...req.body,
      owner: req.user.id,
      leads: leadsIds,
    });

    res
      .status(201)
      .json({ message: "Created new campaign", campaign: campaign });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot create campaign", error: error.message });
  }
};

export const sendCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const failedEmails = [];

    const campaign = await Campaign.findById(id).populate("leads");

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (campaign.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to send this campaign" });
    }

    if (!campaign.leads || campaign.leads.length === 0) {
      return res.status(400).json({ message: "No leads to send the campaign" });
    }

    for (const lead of campaign.leads) {
      try {
        const personalizedSubject = campaign.subject
          .replace("{name}", lead.name || "")
          .replace("{company}", lead.company || "");
        const personalizedText = campaign.text
          .replace("{name}", lead.name || "")
          .replace("{company}", lead.company || "");

        await sendEmail(lead.email, personalizedSubject, personalizedText);
      } catch (err) {
        console.error(`Failed to send email to ${lead.email}:`, err.message);
        failedEmails.push(lead.email);
      }
    }

    campaign.status = "sent";
    await campaign.save();

    if (failedEmails.length > 0) {
      return res.json({
        message: `Campaign sent with some errors. Failed: ${failedEmails.join(", ")}`,
        failedCount: failedEmails.length,
      });
    }

    res.json({ message: "All emails sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Cannot send campaign",
      error: error.message,
    });
  }
};
