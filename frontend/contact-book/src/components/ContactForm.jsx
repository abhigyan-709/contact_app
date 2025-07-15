import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'; // use material style

const ContactForm = ({ onSubmit, editing }) => {
  const [form, setForm] = useState({
    name: "",
    country_code: "+91",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      reset();
    }
  }, [editing]);

  const reset = () =>
    setForm({
      name: "",
      country_code: "+91",
      phone: "",
      email: "",
    });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.match(/^\d{10}$/)) errs.phone = "Phone must be 10 digits";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    // extract country code and number
    const phoneWithoutCode = value.replace(data.dialCode, "");
    handleChange("country_code", `+${data.dialCode}`);
    handleChange("phone", phoneWithoutCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          fullWidth
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <PhoneInput
          country={'in'}
          value={`${form.country_code.replace("+", "")}${form.phone}`}
          onChange={handlePhoneChange}
          inputStyle={{ width: '100%' }}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: false
          }}
        />
        {errors.phone && (
          <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.phone}</span>
        )}

        <TextField
          label="Email"
          fullWidth
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Button variant="contained" type="submit">
          {editing ? "Update" : "Save"}
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
