import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";

const initialState = {
  name: "",
  country_code: "",
  phone: "",
  email: "",
};

const ContactForm = ({ onSubmit, editing }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm(initialState);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} style={{ marginBottom: 10 }} />
      <TextField fullWidth label="Country Code" name="country_code" value={form.country_code} onChange={handleChange} style={{ marginBottom: 10 }} />
      <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} style={{ marginBottom: 10 }} />
      <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} style={{ marginBottom: 10 }} />
      <Button variant="contained" type="submit">
        {editing ? "UPDATE CONTACT" : "SAVE CONTACT"}
      </Button>
    </form>
  );
};

export default ContactForm;
