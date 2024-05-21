import React, { useState } from "react";
import Layout from "./Layout";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import deLocale from "date-fns/locale/de";
import { Box, TextField, Button } from "@mui/material";
import { Container } from "@mui/system";

const locales = {
  de: deLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      allDay: false,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <form onSubmit={handleSubmit} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "background.paper",
              p: 2,
            }}
          >
            <TextField
              label="Ereignistitel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Ereignis hinzufügen
            </Button>
          </Box>
          <Box
            sx={{
              height: 630,
              border: "1px solid grey",
              borderRadius: 2,
              align: "center",
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
        </form>
      </Container>
    </Layout>
  );
};

export default Terminmanager;
