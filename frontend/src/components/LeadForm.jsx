import { useState, useEffect } from "react";
import { UserPlus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./LeadForm.module.css";

function LeadForm({ fetchLeads, editingLead, setEditingLead }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingLead) setForm(editingLead);
    else setForm({ name: "", email: "", company: "" });
  }, [editingLead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingLead) {
        const response = await api.put(`/leads/${editingLead._id}`, form);
        toast.success(response.data.message || "Lead updated successfully");
        setEditingLead(null);
      } else {
        const response = await api.post("/leads", form);
        toast.success(response.data.message || "New lead added successfully");
      }
      setForm({ name: "", email: "", company: "" });
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>
        {editingLead ? <Save size={20} /> : <UserPlus size={20} />}
        {editingLead ? "Edit Lead" : "Add New Lead"}
      </h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Company</label>
          <input
            name="company"
            placeholder="Acme Inc."
            value={form.company}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Saving..." : editingLead ? "Update Lead" : "Create Lead"}
        </button>

        {editingLead && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setEditingLead(null)}
          >
            <X size={14} /> Cancel Editing
          </button>
        )}
      </form>
    </div>
  );
}

export default LeadForm;
