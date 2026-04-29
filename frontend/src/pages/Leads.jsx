import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import LeadForm from "../components/LeadForm";
import styles from "./Leads.module.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get("/leads");
      setLeads(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success("Lead successfully deleted");
        fetchLeads();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete lead");
      }
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Leads Management</h1>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search leads..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.formSection}>
          <LeadForm
            fetchLeads={fetchLeads}
            editingLead={editingLead}
            setEditingLead={setEditingLead}
          />
        </aside>

        <section className={styles.listSection}>
          {loading ? (
            <div className={styles.loadingText}>Loading your leads...</div>
          ) : filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <div key={lead._id} className={styles.card}>
                <div className={styles.leadDetails}>
                  <h3>{lead.name}</h3>
                  <p>{lead.email} • {lead.company}</p>
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.iconBtn} ${styles.editBtn}`}
                    onClick={() => setEditingLead(lead)}
                    title="Edit Lead"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(lead._id)}
                    title="Delete Lead"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyText}>
              {searchTerm ? "No leads match your search." : "No leads found. Start by adding one!"}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Leads;
