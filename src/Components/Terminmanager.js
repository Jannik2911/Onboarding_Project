import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import deLocale from "date-fns/locale/de";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const locales = {
  de: deLocale,
};

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) =>
    format(date, formatStr, { locale: options?.locale }),
  parse: (dateStr, formatStr, options) =>
    parse(dateStr, formatStr, new Date(), { locale: options?.locale }),
  startOfWeek: (date, options) =>
    startOfWeek(date, { locale: options?.locale }),
  getDay: (date) => getDay(date),
  locales,
});

const messages = {
  allDay: "Ganztägig",
  previous: "Zurück",
  next: "Weiter",
  today: "Heute",
  month: "Monat",
  week: "Woche",
  day: "Tag",
  agenda: "Agenda",
  date: "Datum",
  time: "Zeit",
  event: "Ereignis",
  noEventsInRange: "Keine Ereignisse in diesem Zeitraum.",
  showMore: (total) => `+${total} mehr`,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#083163", // Customize your primary color here
    },
    secondary: {
      main: "#395a82", // Customize your secondary color here
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#083163",
        },
      },
    },
  },
});

const Terminmanager = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [room, setRoom] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(
      storedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    fetch("http://localhost:8000/names")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        localStorage.setItem("contacts", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      allDay: false,
      room,
      employees: selectedEmployees,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setTitle("");
    setStart("");
    setEnd("");
    setRoom("");
    setSelectedEmployees([]);
  };

  const handleReset = () => {
    setTitle("");
    setStart("");
    setEnd("");
    setRoom("");
    setSelectedEmployees([]);
  };

  const handleDelete = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    handleClose();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleEmployeeDialogOpen = () => {
    setEmployeeDialogOpen(true);
  };

  const handleEmployeeDialogClose = () => {
    setEmployeeDialogOpen(false);
  };

  const handleEmployeeSelect = (employee) => {
    if (!selectedEmployees.includes(employee)) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleEmployeeRemove = (employeeToRemove) => {
    setSelectedEmployees(
      selectedEmployees.filter((employee) => employee !== employeeToRemove)
    );
  };

  const eventStyleGetter = () => {
    const backgroundColor = theme.palette.primary.main;
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <Layout headerText={"Terminmanager"}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, boxShadow: 3 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        fullWidth
                        required
                        label="Titel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        required
                        label="Beginn"
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        required
                        label="Ende"
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <TextField
                        fullWidth
                        label="Raum"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" justifyContent="flex-start">
                        <Button
                          variant="outlined"
                          onClick={handleEmployeeDialogOpen}
                          startIcon={<AddIcon />}
                        >
                          Mitarbeiter hinzufügen
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      {selectedEmployees.length > 0 && (
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {selectedEmployees.map((employee) => (
                            <Chip
                              key={employee.id}
                              label={`${employee.firstName} ${employee.lastName}`}
                              onDelete={() => handleEmployeeRemove(employee)}
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                      <Box display="flex" justifyContent="flex-start" gap={2}>
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          onClick={handleReset}
                        >
                          Zurücksetzen
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Ereignis hinzufügen
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, boxShadow: 3 }}>
                <Box
                  sx={{
                    height: "calc(50vh)",
                    border: "1px solid grey",
                    borderRadius: 2,
                    textAlign: "center",
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    culture="de"
                    messages={messages}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyleGetter}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ereignisdetails</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <>
                <DialogContentText>
                  <strong>Titel:</strong> {selectedEvent.title}
                </DialogContentText>
                <DialogContentText>
                  <strong>Beginn:</strong>{" "}
                  {format(selectedEvent.start, "dd.MM.yyyy HH:mm")}
                </DialogContentText>
                <DialogContentText>
                  <strong>Ende:</strong>{" "}
                  {format(selectedEvent.end, "dd.MM.yyyy HH:mm")}
                </DialogContentText>
                <DialogContentText>
                  <strong>Raum:</strong> {selectedEvent.room}
                </DialogContentText>
                <DialogContentText>
                  <strong>Mitarbeiter:</strong>{" "}
                  {selectedEvent.employees
                    .map(
                      (employee) => `${employee.firstName} ${employee.lastName}`
                    )
                    .join(", ")}
                </DialogContentText>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Schließen
            </Button>
            <Button
              onClick={() => handleDelete(selectedEvent)}
              sx={{ color: "red" }}
              startIcon={<DeleteIcon />}
            >
              Löschen
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={employeeDialogOpen}
          onClose={handleEmployeeDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Mitarbeiter auswählen</DialogTitle>
          <DialogContent>
            <List>
              {employees.map((employee) => (
                <ListItem
                  button
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <ListItemText
                    primary={`${employee.firstName} ${employee.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEmployeeDialogClose} color="primary">
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Layout>
  );
};

export default Terminmanager;
