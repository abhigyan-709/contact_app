import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: 20 }}>
      {contacts.map((contact) => (
        <Card key={contact._id} variant="outlined" style={{ width: 250 }}>
          <CardContent>
            <Typography variant="h6"><b>{contact.name}</b></Typography>
            <Typography>Phone: {contact.country_code} {contact.phone}</Typography>
            <Typography>Email: {contact.email}</Typography>

            <Button variant="outlined" size="small" onClick={() => onEdit(contact)} style={{ marginTop: 8, marginRight: 8 }}>
              Edit
            </Button>
            <Button variant="outlined" size="small" color="error" onClick={() => onDelete(contact._id)} style={{ marginTop: 8 }}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactList;
