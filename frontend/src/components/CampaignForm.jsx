import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import styles from "./CampaignForm.module.css";

function CampaignForm({ fetchCampaigns }) {
  const [form, setform] = useState({ title: "", subject: "", text: "" });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/campaigns", form);
      toast.success(response.data.message);
      fetchCampaigns();
      setform({ title: "", subject: "", text: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Email Subject – personalize with {name}, {company}"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Email Text – personalize with {name}, {company}"
          name="text"
          value={form.text}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Create Campaign
        </button>
      </form>
    </>
  );
}

export default CampaignForm;
