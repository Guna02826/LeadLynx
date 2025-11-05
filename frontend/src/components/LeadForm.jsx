import { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
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
        toast.success(response.data.message);
        setEditingLead(null);
      } else {
        const response = await api.post("/leads", form);
        toast.success(response.data.message);
      }
      setForm({ name: "", email: "", company: "" });
      fetchLeads();
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create Lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Lead name"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          name="email"
          placeholder="Lead email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          name="company"
          placeholder="Lead company"
          value={form.company}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          {loading
            ? editingLead
              ? "Updating Lead..."
              : "Creating Lead..."
            : editingLead
            ? "Update Lead"
            : "Create Lead"}
        </button>
      </form>
    </>
  );
}

export default LeadForm;
