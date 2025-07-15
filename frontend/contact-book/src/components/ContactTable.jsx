import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const ContactTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Saved Contacts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No contacts saved yet.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{`${contact.country_code} ${contact.phone}`}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onEdit(contact)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onDelete(contact)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ContactTable;
