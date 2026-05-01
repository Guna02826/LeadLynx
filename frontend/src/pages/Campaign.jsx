import { useEffect, useState } from "react";
import { Send, Clock, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import CampaignForm from "../components/CampaignForm";
import ConfirmModal from "../components/ConfirmModal";
import styles from "./Campaign.module.css";

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmLaunchId, setConfirmLaunchId] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get("/campaigns");
      setCampaigns(response.data.data.campaign);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSend = async (id) => {
    try {
      setSendingId(id);
      const response = await api.post(`/campaigns/${id}/send`);
      toast.success(response.data.message || "Campaign launched successfully!");
      fetchCampaigns();
    } catch (error) {
      toast.error(error.response?.data?.message || "Launch failed");
    } finally {
      setSendingId(null);
      setConfirmLaunchId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/campaigns/${id}`);
      toast.success("Campaign deleted");
      fetchCampaigns();
      if (editingCampaign?._id === id) setEditingCampaign(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Email Campaigns</h1>

      <div className={styles.mainContent}>
        <aside>
          <CampaignForm 
            fetchCampaigns={fetchCampaigns} 
            editingCampaign={editingCampaign}
            setEditingCampaign={setEditingCampaign}
          />
        </aside>

        <section>
          <h2 className={styles.subtitle}>Recent Campaigns</h2>
          <div className={styles.list}>
            {loading ? (
              <div className={styles.loadingText}>Fetching campaigns...</div>
            ) : campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <div key={campaign._id} className={styles.card}>
                  <div className={styles.campaignInfo}>
                    <h4>{campaign.title}</h4>
                    <div className={styles.statusBadge}>
                      {campaign.status === "sent" ? (
                        <span className={`${styles.status} ${styles.statusSent}`}>
                          <CheckCircle size={12} style={{ marginRight: 4 }} />
                          Sent
                        </span>
                      ) : (
                        <span className={`${styles.status} ${styles.statusNew}`}>
                          <Clock size={12} style={{ marginRight: 4 }} />
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.campaignActions}>
                    {campaign.status !== "sent" && (
                      <>
                        <button
                          className={`${styles.iconBtn} ${styles.editBtn}`}
                          onClick={() => setEditingCampaign(campaign)}
                          title="Edit Campaign"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.sendBtn}`}
                          onClick={() => setConfirmLaunchId(campaign._id)}
                          disabled={sendingId === campaign._id}
                          title="Launch Campaign"
                        >
                          <Send size={16} />
                        </button>
                      </>
                    )}
                    <button
                      className={`${styles.iconBtn} ${styles.deleteBtn}`}
                      onClick={() => setDeleteId(campaign._id)}
                      title="Delete Campaign"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyText}>
                No campaigns created yet. Start your first outreach!
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title="Delete Campaign"
        message="Are you sure you want to delete this campaign? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />

      <ConfirmModal
        isOpen={!!confirmLaunchId}
        onClose={() => setConfirmLaunchId(null)}
        onConfirm={() => handleSend(confirmLaunchId)}
        title="Launch Campaign"
        message="Ready to start sending emails? This will contact all leads assigned to this campaign."
        confirmText="Launch Now"
        type="warning"
      />
    </div>
  );
}

export default Campaign;
