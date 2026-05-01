import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Users, Send, LogOut, Zap, Sparkles, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout, demoLogin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDemoLogin = async () => {
    const result = await demoLogin();
    if (result.success) {
      toast.success("Logged in as Demo User");
      navigate("/");
    } else {
      toast.error(result.message);
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
