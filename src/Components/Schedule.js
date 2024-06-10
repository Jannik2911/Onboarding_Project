import * as React from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect, createContext, useContext } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EventsContext = createContext();

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const role = "KVD";

  useEffect(() => {
    const storedEvents = localStorage.getItem(`onboardingEvents_${role}`);
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      const sortedEvents = parsedEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedEvents);
    } else {
      setEvents([]);
    }
  }, []);

  const calculateHeight = (index, totalEvents) => {
    const totalHeight = 800;
    const margin = 10;
    return (totalHeight - (totalEvents - 1) * margin) / totalEvents;
  };

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      <Layout headerText={"Ablaufplan"}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Box>
            {events.map((event, index) => {
              const height = calculateHeight(index, events.length);
              return (
                <Card
                  key={index}
                  style={{ marginBottom: "10px", height: `${height}px` }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {event.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {new Date(event.date).toLocaleDateString("de-DE")}
                    </Typography>
                    <Typography variant="body2">{event.employee}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Container>
      </Layout>
    </EventsContext.Provider>
  );
};

export default Schedule;
