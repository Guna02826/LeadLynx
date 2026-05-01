import { useState, useEffect } from "react";
import { UserPlus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import Input from "./common/Input";
import Button from "./common/Button";
import styles from "./LeadForm.module.css";

function LeadForm({ fetchLeads, editingLead, setEditingLead }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    source: "Manual",
    status: "New",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingLead) setForm(editingLead);
    else setForm({ name: "", email: "", company: "", source: "Manual", status: "New" });
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
      setForm({ name: "", email: "", company: "", source: "Manual", status: "New" });
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
        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Company"
          name="company"
          placeholder="Acme Inc."
          value={form.company}
          onChange={handleChange}
          required
        />

        <Input
          label="Source"
          name="source"
          placeholder="Manual, Website, etc."
          value={form.source}
          onChange={handleChange}
        />

        <div className={styles.inputGroup}>
          <label className={styles.label}>Status</label>
          <div className={styles.statusContainer}>
            {["New", "Contacted", "Qualified", "Disqualified"].map((status) => (
              <span
                key={status}
                className={`${styles.statusBadge} ${styles[status.toLowerCase()]} ${
                  form.status === status ? styles.activeStatus : ""
                }`}
                onClick={() => setForm({ ...form, status })}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingLead ? "Update Lead" : "Create Lead"}
        </Button>

        {editingLead && (
          <Button
            variant="danger"
            onClick={() => setEditingLead(null)}
            className={styles.cancelBtn}
            icon={<X size={14} />}
          >
            Cancel Editing
          </Button>
        )}
      </form>
    </div>
  );
}

export default LeadForm;
