// src/App.js

import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Book
      </Typography>
      <ContactForm onContactAdded={triggerRefresh} />
      <ContactList refresh={refresh} />
    </Container>
  );
}

export default App;
