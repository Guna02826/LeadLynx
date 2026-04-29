import { useEffect, useState } from "react";
import { Users, Mail, Send, FileText } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCampaigns: 0,
    sentCampaigns: 0,
    draftCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [leadsRes, campaignsRes] = await Promise.all([
        api.get("/leads"),
        api.get("/campaigns"),
      ]);

      const totalLeads = leadsRes.data.length;
      const totalCampaigns = campaignsRes.data.campaign.length;
      const sentCampaigns = campaignsRes.data.campaign.filter(
        (c) => c.status?.toLowerCase() === "sent"
      ).length;
      const draftCampaigns = campaignsRes.data.campaign.filter(
        (c) => c.status?.toLowerCase() === "new" || c.status?.toLowerCase() === "draft"
      ).length;

      setStats({
        totalLeads,
        totalCampaigns,
        sentCampaigns,
        draftCampaigns,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: <Users size={24} /> },
    { label: "Total Campaigns", value: stats.totalCampaigns, icon: <Mail size={24} /> },
    { label: "Sent Campaigns", value: stats.sentCampaigns, icon: <Send size={24} /> },
    { label: "Draft Campaigns", value: stats.draftCampaigns, icon: <FileText size={24} /> },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening with your leads.</p>
      </header>

      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{stat.icon}</div>
            <h2 className={styles.number}>
              {loading ? "..." : stat.value}
            </h2>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
