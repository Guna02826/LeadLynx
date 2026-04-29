import { useEffect, useState } from "react";
import { Send, Clock, CheckCircle, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import CampaignForm from "../components/CampaignForm";
import styles from "./Campaign.module.css";

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get("/campaigns");
      setCampaigns(response.data.campaign);
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
    if (window.confirm("Ready to launch? This will send emails to all leads in this campaign.")) {
      try {
        setSendingId(id);
        const response = await api.post(`/campaigns/${id}/send`);
        toast.success(response.data.message || "Campaign launched successfully!");
        fetchCampaigns();
      } catch (error) {
        toast.error(error.response?.data?.message || "Launch failed");
      } finally {
        setSendingId(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Email Campaigns</h1>

      <div className={styles.mainContent}>
        <aside>
          <CampaignForm fetchCampaigns={fetchCampaigns} />
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

                  {campaign.status !== "sent" && (
                    <button
                      onClick={() => handleSend(campaign._id)}
                      disabled={sendingId === campaign._id}
                      className={styles.sendBtn}
                    >
                      {sendingId === campaign._id ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Launch</span>
                        </>
                      )}
                    </button>
                  )}
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
    </div>
  );
}

export default Campaign;
