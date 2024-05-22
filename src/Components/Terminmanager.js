import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
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
  Typography,
  Grid,
  Paper,
} from "@mui/material";

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

const Terminmanager = () => {
  const [events, setEvents] = useState([
    {
      title: "Test",
      start: new Date(2024, 4, 20, 13, 0, 0),
      end: new Date(2024, 4, 20, 14, 0, 0),
      allDay: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      allDay: false,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <Layout headerText={"Terminmanager"}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      label="Beschreibung"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      type="datetime-local"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      type="datetime-local"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button type="submit" variant="contained" color="primary">
                      Ereignis hinzufügen
                    </Button>
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
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Terminmanager;
