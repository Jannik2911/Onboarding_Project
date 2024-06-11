import {
  Paper,
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
  Container,
} from "@mui/material";
import Layout from "./Layout";
import UserChannel from "./UserChannel";

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

const handleContactSubmit = (event) => {
  event.preventDefault();
  console.log("Kontaktformular abgeschickt");
};

const Application = ({ activeStep = 2 }) => (
  <Layout headerText="Bewerbungsstand">
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
            <UserChannel applicationChat={true} />
          </Box>
        </Box>
      </Paper>
    </Container>
  </Layout>
);

export default Application;
