import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
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
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 500);
    } catch (error) {
      toast.error(error.response.data.message || "Couldn't register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>

        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
