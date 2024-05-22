import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "./Layout";

export default function Mitarbeiterverwaltung() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [fb, setFb] = useState("");

  const [mitarbeiterListe, setMitarbeiterListe] = useState(() => {
    const saved = localStorage.getItem("mitarbeiter");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mitarbeiter", JSON.stringify(mitarbeiterListe));
  }, [mitarbeiterListe]);

  const handleClick = () => {
    if (name && lastname && email && fb) {
      const newMitarbeiter = { name, lastname, email, fb };
      setMitarbeiterListe([...mitarbeiterListe, newMitarbeiter]);
      setName("");
      setLastname("");
      setEmail("");
      setFb("");
    }
  };

  const handleDelete = (index) => {
    const newList = [...mitarbeiterListe];
    newList.splice(index, 1);
    setMitarbeiterListe(newList);
  };

  return (
    <Layout headerText={"Mitarbeiterverwaltung"}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    id="name"
                    label="Vorname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    id="lastname"
                    label="Nachname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    id="email"
                    label="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    id="fb"
                    label="Fachbereich"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleClick} fullWidth>
                    Hinzufügen
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Mitarbeiterliste
              </Typography>
              <List>
                {mitarbeiterListe.map((mitarbeiter, index) => (
                  <ListItem
                    key={index}
                    sx={{ border: "1px solid grey", borderRadius: 2, mb: 1 }}
                    style={{
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(index)}
                      >
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
