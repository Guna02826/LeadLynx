import styles from "./Input.module.css";

const Input = ({ label, type = "text", name, placeholder, value, onChange, required = false, className = "", ...props }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default Input;
