import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import LeadForm from "../components/LeadForm";
import SearchBar from "../components/SearchBar";
import LeadCard from "../components/LeadCard";
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
        <SearchBar
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
              <LeadCard
                key={lead._id}
                lead={lead}
                onEdit={setEditingLead}
                onDelete={handleDelete}
              />
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
