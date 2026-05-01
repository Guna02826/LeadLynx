import styles from "./Badge.module.css";

const Badge = ({ children, status }) => {
  const statusClass = status ? styles[status.toLowerCase()] : "";
  
  return (
    <span className={`${styles.badge} ${statusClass}`}>
      {children}
    </span>
  );
};

export default Badge;
