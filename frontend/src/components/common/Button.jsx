import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, className = "", icon }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
