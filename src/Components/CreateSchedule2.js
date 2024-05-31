import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Layout from './Layout';

// Erstellung des Contexts für die Ereignisse
const EventsContext = createContext();

const Mitarbeiter = {
  'Mitarbeiter A': 'Mitarbeiter A',
  'Mitarbeiter B': 'Mitarbeiter B',
};

const AdminPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [employee, setEmployee] = useState(Object.keys(Mitarbeiter)[0]);
  const { events, setEvents } = useContext(EventsContext);

  useEffect(() => {
    const storedEvents = localStorage.getItem(`onboardingEvents_${employee}`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents([]);
    }
  }, [employee, setEvents]);

  const handleAddEvent = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      employee: employee,
    };
    const updatedEvents = [...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(updatedEvents);
    localStorage.setItem(`onboardingEvents_${employee}`, JSON.stringify(updatedEvents));
    setEventName('');
    setEventDate('');
  };

  return (
    <Layout>
    <Container>
      <Typography variant="h4" gutterBottom>
        Onboarding Ablaufplan erstellen
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Typography variant="h6">Neues Ereignis hinzufügen</Typography>
            <TextField
              label="Ereignisname"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
              label="Datum"
              type="date"
              fullWidth
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              label="Mitarbeiter"
              fullWidth
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {Object.keys(Mitarbeiter).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEvent}
              disabled={!eventName || !eventDate}
            >
              Ereignis hinzufügen
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            <Typography variant="h6">Ablaufplan für {employee}</Typography>
            <Timeline position="alternate">
              {events.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {event.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {event.name}
                    </Typography>
                    <Typography>{`Mitarbeiter: ${event.employee}`}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  );
};

const App = () => {
  const [events, setEvents] = useState([]);
  
  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      <AdminPage />
    </EventsContext.Provider>
  );
};

export default App;
