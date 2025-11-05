import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Navbar.module.css";

function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authChange")); // ✅ triggers re-render
    navigate("/login");
  };
  return (
    <header className={styles.navbarContainer}>
      <div className={styles.brand}>LeadLynx</div>

      <nav className={styles.navbar}>
        {!user ? (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        ) : (
          <div className={styles.userSection}>
            <Link to="/" className={styles.link}>
              Dashboard
            </Link>
            <Link to="/leads" className={styles.link}>
              Leads
            </Link>
            <Link to="/campaign" className={styles.link}>
              Campaign
            </Link>
            <span className={styles.username}>Hello, {user}</span>
            <Link
              to="/login"
              onClick={handleLogout}
              className={`${styles.link} ${styles.logout}`}
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
