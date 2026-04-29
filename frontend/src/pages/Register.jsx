import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api";
import styles from "./Register.module.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/users/register", form);
      toast.success(response.data.message || "Account created! Please log in.");
      setTimeout(() => navigate("/login"), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join LeadLynx and start growing your leads.</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              required
              onChange={handleChange}
              className={styles.input}
            />
          </div>

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
            {loading ? "Creating Account..." : (
              <>
                <UserPlus size={18} />
                <span>Get Started</span>
              </>
            )}
          </button>
        </form>

        <footer className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Sign In
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Register;
