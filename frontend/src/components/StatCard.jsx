import styles from "./StatCard.module.css";

const StatCard = ({ label, value, icon, loading }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h2 className={styles.number}>
        {loading ? "..." : value}
      </h2>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default StatCard;
