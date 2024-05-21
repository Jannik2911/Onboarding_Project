import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from "./Layout";
import { useState, useEffect } from "react";

export default function Mitarbeiterverwaltung() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [fb, setFb] = useState('');

  const [mitarbeiterListe, setMitarbeiterListe] = useState(() => {
    const saved = localStorage.getItem("mitarbeiter");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mitarbeiter", JSON.stringify(mitarbeiterListe));
  }, [mitarbeiterListe]);

  const handleClick = () => {
    const newMitarbeiter = { name, lastname, email, fb };
    setMitarbeiterListe([...mitarbeiterListe, newMitarbeiter]);
    setName('');
    setLastname('');
    setEmail('');
    setFb('');
  };

  const handleDelete = (index) => {
    const newList = [...mitarbeiterListe];
    newList.splice(index, 1);
    setMitarbeiterListe(newList);
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
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <TextField
                sx={{ mb: 1, mr: 1 }}
                required
                id="lastname"
                label="Nachname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
              <TextField
                required
                id="email"
                label="E-Mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                required
                id="fb"
                label="Fachbereich"
                value={fb}
                onChange={e => setFb(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              onClick={handleClick}
            >
              Hinzufügen
            </Button>
          </div>
        </Box>
        <Box sx={{ p: 2, boxShadow: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Mitarbeiter Liste
          </Typography>
          <List>
            {mitarbeiterListe.map((mitarbeiter, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${mitarbeiter.name} ${mitarbeiter.lastname}`}
                  secondary={`${mitarbeiter.email}, Fachbereich: ${mitarbeiter.fb}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Layout>
  );
}
