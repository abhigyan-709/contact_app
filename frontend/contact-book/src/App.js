import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable"; // ✅ use new table view
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import debounce from "lodash/debounce";

const API = "http://localhost:8000/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  const searchContacts = async (query) => {
    if (query.trim() === "") {
      fetchContacts();
      return;
    }

    const res = await axios.get(`${API}/search?query=${query}`);
    setContacts(res.data);
  };

  const debouncedSearch = useCallback(debounce(searchContacts, 300), []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const saveContact = async (contact) => {
    if (editing) {
      await axios.put(`${API}/${editing._id}`, contact);
      setEditing(null);
    } else {
      await axios.post(API, contact);
    }
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchContacts();
  };

  const editContact = (contact) => {
    setEditing(contact);
  };

  const handleExport = (type) => {
    window.open(`http://localhost:8000/contacts/export/${type}`, "_blank");
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/import`, formData);
      alert(`${res.data.inserted} contacts imported successfully`);
      fetchContacts();
    } catch (error) {
      alert(
        error?.response?.data?.detail ||
          "Error importing file. Please check file format."
      );
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Book
      </Typography>

      <TextField
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Button variant="outlined" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outlined" onClick={() => handleExport("xlsx")}>
          Export XLSX
        </Button>
        <Button variant="outlined" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
        <Button variant="contained" component="label">
          Import CSV/XLSX
          <input
            type="file"
            accept=".csv, .xlsx"
            hidden
            onChange={handleImport}
          />
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        {editing ? "Edit Contact" : "Add New Contact"}
      </Typography>
      <ContactForm onSubmit={saveContact} editing={editing} />

      <ContactTable
        contacts={contacts}
        onEdit={editContact}
        onDelete={(contact) => deleteContact(contact._id)}
      />
    </Box>
  );
}

export default App;
