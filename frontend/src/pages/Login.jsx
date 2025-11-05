import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Login.module.css";

function Login() {
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
      const response = await api.post("/users/login", form);
      toast.success(response.data.message);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      window.dispatchEvent(new Event("authChange"));

      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      toast.error(error.response.data.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            required
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            required
            onChange={handleChange}
            className={styles.input}
          />

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>
            New User
          </Link>
        </p>

        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
