import { useState } from "react";
import { MailPlus, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./CampaignForm.module.css";

function CampaignForm({ fetchCampaigns }) {
  const [form, setForm] = useState({ title: "", subject: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/campaigns", form);
      toast.success(response.data.message || "Campaign created!");
      fetchCampaigns();
      setForm({ title: "", subject: "", text: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>
        <MailPlus size={20} />
        New Outreach Campaign
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Campaign Internal Title</label>
          <input
            type="text"
            placeholder="e.g., Q2 Follow-up"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Subject</label>
          <input
            type="text"
            placeholder="Interested in collaboration?"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Message</label>
          <textarea
            placeholder="Hi {name}, I saw that {company} is doing great things..."
            name="text"
            value={form.text}
            onChange={handleChange}
            required
            className={`${styles.input} ${styles.textarea}`}
          />
          <p className={styles.hint}>
            <Sparkles size={12} style={{ marginRight: 4 }} />
            Use <code>{`{name}`}</code> and <code>{`{company}`}</code> for personalization.
          </p>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}

export default CampaignForm;
