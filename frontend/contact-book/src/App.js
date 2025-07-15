// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import ContactForm from "./components/ContactForm";
// import ContactList from "./components/ContactList";
// import { TextField } from "@mui/material";
// import debounce from "lodash/debounce";

// const API = "http://localhost:8000/contacts";

// function App() {
//   const [contacts, setContacts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchContacts = async () => {
//     const res = await axios.get(API);
//     setContacts(res.data);
//   };

//   const searchContacts = async (query) => {
//     if (query.trim() === "") {
//       fetchContacts();
//       return;
//     }

//     const res = await axios.get(`${API}/search?query=${query}`);
//     setContacts(res.data);
//   };

//   // Debounced search to avoid API spamming
//   const debouncedSearch = useCallback(debounce(searchContacts, 300), []);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     debouncedSearch(e.target.value);
//   };

//   const saveContact = async (contact) => {
//     if (editing) {
//       await axios.put(`${API}/${editing._id}`, contact);
//       setEditing(null);
//     } else {
//       await axios.post(API, contact);
//     }
//     fetchContacts();
//   };

//   const deleteContact = async (id) => {
//     await axios.delete(`${API}/${id}`);
//     fetchContacts();
//   };

//   const editContact = (contact) => {
//     setEditing(contact);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Contact Book</h1>

//       <TextField
//         label="Search"
//         fullWidth
//         value={searchQuery}
//         onChange={handleSearch}
//         style={{ marginBottom: 20 }}
//       />

//       <h3>{editing ? "Edit Contact" : "Add New Contact"}</h3>
//       <ContactForm onSubmit={saveContact} editing={editing} />

//       <h3 style={{ marginTop: "2rem" }}>Saved Contacts</h3>
//       <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { TextField, Button, Stack, Typography } from "@mui/material";
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

  // Debounced search to avoid API spamming
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

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Contact Book
      </Typography>

      <TextField
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />

      <Stack direction="row" spacing={2} style={{ marginBottom: 20 }}>
        <Button variant="outlined" onClick={() => handleExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outlined" onClick={() => handleExport("xlsx")}>
          Export XLSX
        </Button>
        <Button variant="outlined" onClick={() => handleExport("pdf")}>
          Export PDF
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        {editing ? "Edit Contact" : "Add New Contact"}
      </Typography>
      <ContactForm onSubmit={saveContact} editing={editing} />

      <Typography variant="h6" style={{ marginTop: "2rem" }}>
        Saved Contacts
      </Typography>
      <ContactList
        contacts={contacts}
        onEdit={editContact}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
