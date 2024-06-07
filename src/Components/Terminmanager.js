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
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      setEvents(parsedEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      })));
    }
  }, []);

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
      room,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setTitle("");
    setStart("");
    setEnd("");
    setRoom("");
  };

  const handleReset = () => {
    setTitle("");
    setStart("");
    setEnd("");
    setRoom("");
  };

  return (
    <Layout headerText={"Terminmanager"}>
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
                  components={{
                    event: ({ event }) => (
                      <span>
                        <strong>{event.title}</strong>
                        {event.room && (
                          <>
                            <br />
                            <small>{event.room}</small>
                          </>
                        )}
                      </span>
                    ),
                  }}
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
