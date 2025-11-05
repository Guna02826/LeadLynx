import { React, useState, useEffect } from "react";
import api from "../api";
import LeadForm from "../components/LeadForm";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Leads.module.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);

  const fetchLeads = async () => {
    try {
      const response = await api.get("/leads");
      toast.success(response.data.message);
      setLeads(response.data);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch leads");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this lead?")) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success("Lead Deleted");
        fetchLeads();
      } catch (error) {
        toast.error(error.response.data.message || "Failed to delete lead");
      }
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👤 Leads</h1>

      <div className={styles.formSection}>
        <LeadForm
          fetchLeads={fetchLeads}
          editingLead={editingLead}
          setEditingLead={setEditingLead}
        />
      </div>

      <ul className={styles.list}>
        {leads.length ? (
          leads.map((lead) => (
            <li key={lead._id} className={styles.listItem}>
              <div className={styles.leadInfo}>
                <strong>{lead.name}</strong> – {lead.email} – {lead.company}
              </div>
              <div className={styles.actions}>
                <button
                  className={`${styles.button} ${styles.editBtn}`}
                  onClick={() => setEditingLead(lead)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.button} ${styles.deleteBtn}`}
                  onClick={() => handleDelete(lead._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.emptyText}>No Leads Added</p>
        )}
      </ul>

      <ToastContainer />
    </div>
  );
}

export default Leads;
