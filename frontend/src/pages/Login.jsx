import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogIn, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const { login, demoLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await login(form.email, form.password);
      
      if (result.success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      const result = await demoLogin();
      
      if (result.success) {
        toast.success("Logged in as Demo User");
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Log in to manage your campaigns.</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              required
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              required
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Signing in..." : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button 
          onClick={handleDemoLogin} 
          disabled={loading} 
          className={`${styles.button} ${styles.demoButton}`}
        >
          Explore as Demo User
        </button>

        <footer className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>
            Create one
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
