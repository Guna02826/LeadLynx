import { useEffect, useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCampaigns: 0,
    sentCampaigns: 0,
    draftCampaigns: 0,
  });

  const fetchStats = async () => {
    try {
      const [leadsRes, campaignsRes] = await Promise.all([
        api.get("/leads"),
        api.get("/campaigns"),
      ]);

      const totalLeads = leadsRes.data.length;
      const totalCampaigns = campaignsRes.data.campaign.length;
      const sentCampaigns = campaignsRes.data.campaign.filter(
        (c) => c.status === "sent"
      ).length;
      const draftCampaigns = campaignsRes.data.campaign.filter(
        (c) => c.status === "New"
      ).length;

      setStats({
        totalLeads,
        totalCampaigns,
        sentCampaigns,
        draftCampaigns,
      });
    } catch (error) {
      toast.error(error.response.data.message || `couldn't fetch data`);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>📊 Dashboard</h1>

        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <h2 className={styles.number}>{stats.totalLeads}</h2>
            <p className={styles.label}>Total Leads</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.number}>{stats.totalCampaigns}</h2>
            <p className={styles.label}>Total Campaigns</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.number}>{stats.sentCampaigns}</h2>
            <p className={styles.label}>Sent Campaigns</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.number}>{stats.draftCampaigns}</h2>
            <p className={styles.label}>Draft Campaigns</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
