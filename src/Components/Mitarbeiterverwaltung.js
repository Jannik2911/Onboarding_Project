import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import Layout from "./Layout";
import { useState } from "react";

export default function Mitarbeiterverwaltung() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [fb, setFb] = useState("");

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const addUser = () => {
    setUsers([
      ...users,
      { name: name, lastname: lastname, email: email, fb: fb },
    ]);
    setName("");
    setLastname("");
    setEmail("");
    setFb("");
  };

  const handleClick = () => {
    addUser();
    console.log(localStorage.getItem("users"));
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 4,
            mb: 2,
            pt: 1,
            pb: 1,
            boxShadow: 3,
            backgroundColor: "primary.main",
            color: "white",
            mt: "80px",
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom align="center">
            Mitarbeiterverwaltung
          </Typography>
        </Box>
        <Box sx={{ mb: 4, p: 3, boxShadow: 3 }}>
          <div className="mitarbeiter-verwaltung">
            <div>
              <TextField
                sx={{ mb: 1, mr: 1 }}
                required
                id="name"
                label="Vorname"
                onChange={(e) => setName(e)}
              />
              <TextField
                sx={{ mb: 1, mr: 1 }}
                required
                id="lastname"
                label="Nachname"
                onChange={(e) => setLastname(e)}
              />
              <TextField
                required
                id="email"
                label="E-Mail"
                onChange={(e) => setEmail(e)}
              />
              <TextField
                sx={{ mb: 1 }}
                required
                id="fb"
                label="Required"
                onChange={(e) => setFb(e)}
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                handleClick();
              }}
            >
              Hinzufügen
            </Button>
          </div>
        </Box>
      </Container>
    </Layout>
  );
}
