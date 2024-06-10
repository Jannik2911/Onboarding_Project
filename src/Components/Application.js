import { Paper } from "@mui/material";
import Layout from "./Layout";
import { Container } from "@mui/system";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
} from "@mui/material";

const steps = [
  "Bewerbung eingereicht",
  "Unterlagen geprüft",
  "Vorstellungsgespräch",
  "Endgültige Entscheidung",
];

const checklistItems = [
  { label: "Bewerbungseingang bestätigt", checked: true },
  { label: "Unterlagen vollständig", checked: true },
  { label: "Vorstellungsgespräch geplant", checked: false, date: "2024-06-15" },
  { label: "Endgültige Entscheidung erhalten", checked: false },
];

const Application = ({ activeStep = 2 }) => {
  const handleContactSubmit = (event) => {
    event.preventDefault();
    // Hier können Sie den Kontaktanfragen-Handler einfügen
    console.log("Kontaktformular abgeschickt");
  };

  return (
    <Layout headerText={"Bewerbungsstand"}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper>
          <Box sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              Fortschritt der Bewerbung
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Checkliste
              </Typography>
              <List>
                {checklistItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Checkbox checked={item.checked} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={
                        item.date ? `Geplanter Termin: ${item.date}` : null
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Direktnachricht
              </Typography>
              <form onSubmit={handleContactSubmit}>
                <TextField
                  fullWidth
                  required
                  label="Ihre Nachricht"
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Absenden
                </Button>
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Application;
