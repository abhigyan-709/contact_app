// src/components/ContactForm.jsx

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

export default function ContactForm({ onContactAdded }) {
  const [form, setForm] = useState({
    name: "",
    country_code: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://0.0.0.0:8000/contacts", form);
      onContactAdded();
      setForm({ name: "", country_code: "", phone: "", email: "" });
    } catch (error) {
      alert("Failed to add contact");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Contact
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Country Code"
        name="country_code"
        value={form.country_code}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save Contact
      </Button>
    </Box>
  );
}
