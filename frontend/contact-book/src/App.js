import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const API = "http://localhost:8000/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Book</h1>
      <h3>{editing ? "Edit Contact" : "Add New Contact"}</h3>
      <ContactForm onSubmit={saveContact} editing={editing} />
      <h3 style={{ marginTop: "2rem" }}>Saved Contacts</h3>
      <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
    </div>
  );
}

export default App;
