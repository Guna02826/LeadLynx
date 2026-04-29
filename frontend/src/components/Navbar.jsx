import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, Send, LogOut, Zap, Sparkles, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./Navbar.module.css";

function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleDemoLogin = async () => {
    try {
      const response = await api.post("/users/demo-login");
      toast.success(response.data.message || "Logged in as Demo User");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      window.dispatchEvent(new Event("authChange"));

      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      toast.error("Demo login failed.");
    }
  };

  const navItems = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/leads", label: "Leads", icon: <Users size={18} /> },
    { to: "/campaign", label: "Campaign", icon: <Send size={18} /> },
  ];

  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.brand}>
          <Zap size={24} fill="currentColor" />
          <span>LeadLynx</span>
        </Link>

        <nav className={`${styles.navbar} ${isMenuOpen ? styles.menuActive : ""}`}>
          {!user ? (
            <div className={styles.navGroup}>
              <button onClick={handleDemoLogin} className={styles.demoLink}>
                <Sparkles size={16} />
                <span>Explore Demo</span>
              </button>
              <Link to="/login" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className={`${styles.link} ${styles.active}`} onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          ) : (
            <div className={styles.userSection}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
              
              <div className={styles.userInfo}>
                <span className={styles.username}>{user}</span>
                <button
                  onClick={handleLogout}
                  className={`${styles.link} ${styles.logout}`}
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className={styles.mobileOnly}>Logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
