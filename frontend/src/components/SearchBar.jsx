import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className={styles.wrapper}>
      <Search size={18} className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
