import { useEffect, useState } from "react";
import { MailPlus, Sparkles, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./CampaignForm.module.css";

function CampaignForm({ fetchCampaigns, editingCampaign, setEditingCampaign }) {
  const [form, setForm] = useState({ title: "", subject: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCampaign) {
      setForm({
        title: editingCampaign.title || "",
        subject: editingCampaign.subject || "",
        text: editingCampaign.text || "",
      });
    } else {
      setForm({ title: "", subject: "", text: "" });
    }
  }, [editingCampaign]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingCampaign) {
        const response = await api.put(`/campaigns/${editingCampaign._id}`, form);
        toast.success(response.data.message || "Campaign updated!");
        setEditingCampaign(null);
      } else {
        const response = await api.post("/campaigns", form);
        toast.success(response.data.message || "Campaign created!");
      }
      fetchCampaigns();
      setForm({ title: "", subject: "", text: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>
        {editingCampaign ? <Save size={20} /> : <MailPlus size={20} />}
        {editingCampaign ? "Edit Campaign" : "New Outreach Campaign"}
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
          {loading ? "Saving..." : editingCampaign ? "Update Campaign" : "Create Campaign"}
        </button>

        {editingCampaign && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setEditingCampaign(null)}
          >
            <X size={14} /> Cancel Editing
          </button>
        )}
      </form>
    </div>
  );
}

export default CampaignForm;
