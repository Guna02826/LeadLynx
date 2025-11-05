import { useEffect, useState } from "react";
import api from "../api";
import CampaignForm from "../components/CampaignForm";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Campaign.module.css";

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get("/campaigns");
      setCampaigns(response.data.campaign);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSend = async (id) => {
    if (window.confirm("Send this campaign to all leads?")) {
      try {
        const response = await api.post(`/campaigns/${id}/send`);
        toast.success(response.data.message);
        fetchCampaigns();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>📣 Campaign</h2>

        <CampaignForm fetchCampaigns={fetchCampaigns} />

        <h3 className={styles.subtitle}>Your Campaigns:</h3>

        <ul className={styles.list}>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <li key={campaign._id} className={styles.listItem}>
                <div className={styles.info}>
                  <strong>{campaign.title}</strong> —{" "}
                  {campaign.status === "sent" ? (
                    <span className={styles.sent}>✅ Sent</span>
                  ) : (
                    <span className={styles.new}>🕓 New</span>
                  )}
                </div>

                {campaign.status !== "sent" && (
                  <button
                    onClick={() => handleSend(campaign._id)}
                    className={`${styles.button} ${styles.sendBtn}`}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                )}
              </li>
            ))
          ) : (
            <p className={styles.emptyText}>No campaigns yet</p>
          )}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}

export default Campaign;
