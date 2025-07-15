// import React, { useEffect, useState } from "react";
// import { TextField, Button } from "@mui/material";

// const initialState = {
//   name: "",
//   country_code: "",
//   phone: "",
//   email: "",
// };

// const ContactForm = ({ onSubmit, editing }) => {
//   const [form, setForm] = useState(initialState);

//   useEffect(() => {
//     if (editing) {
//       setForm(editing);
//     } else {
//       setForm(initialState);
//     }
//   }, [editing]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(form);
//     setForm(initialState);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} style={{ marginBottom: 10 }} />
//       <TextField fullWidth label="Country Code" name="country_code" value={form.country_code} onChange={handleChange} style={{ marginBottom: 10 }} />
//       <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} style={{ marginBottom: 10 }} />
//       <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} style={{ marginBottom: 10 }} />
//       <Button variant="contained" type="submit">
//         {editing ? "UPDATE CONTACT" : "SAVE CONTACT"}
//       </Button>
//     </form>
//   );
// };

// export default ContactForm;

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const countryCodes = ["+91", "+1", "+44", "+61", "+81"];

const ContactForm = ({ onSubmit, editing }) => {
  const [form, setForm] = useState({
    name: "",
    country_code: "+91",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) setForm(editing);
    else reset();
  }, [editing]);

  const reset = () =>
    setForm({
      name: "",
      country_code: "+91",
      phone: "",
      email: "",
    });

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Invalid email";
    if (!form.phone.match(/^\d{10}$/))
      errs.phone = "Phone must be exactly 10 digits";
    if (!form.country_code.match(/^\+\d{1,4}$/))
      errs.country_code = "Invalid country code";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
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

        <FormControl fullWidth error={!!errors.country_code}>
          <InputLabel>Country Code</InputLabel>
          <Select
            value={form.country_code}
            label="Country Code"
            onChange={(e) => handleChange("country_code", e.target.value)}
          >
            {countryCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Phone"
          fullWidth
          value={form.phone}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
            handleChange("phone", digitsOnly);
          }}
          inputProps={{
            inputMode: "numeric",
            maxLength: 10,
          }}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label="Email"
          fullWidth
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <Button variant="contained" type="submit">
          {editing ? "Update" : "Save"}
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
