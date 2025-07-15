// // src/components/ContactList.jsx

// import React, { useEffect, useState } from "react";
// import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
// import axios from "axios";

// export default function ContactList({ refresh }) {
//   const [contacts, setContacts] = useState([]);

//   const fetchContacts = async () => {
//     try {
//       const res = await axios.get("http://0.0.0.0:8000/contacts");
//       setContacts(res.data);
//     } catch (err) {
//       alert("Failed to load contacts");
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, [refresh]);

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h6" gutterBottom>
//         Saved Contacts
//       </Typography>
//       <Grid container spacing={2}>
//         {contacts.map((contact) => (
//           <Grid item xs={12} md={6} key={contact._id}>
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="subtitle1"><strong>{contact.name}</strong></Typography>
//                 <Typography variant="body2">Phone: +{contact.country_code} {contact.phone}</Typography>
//                 <Typography variant="body2">Email: {contact.email}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

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
