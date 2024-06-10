import * as React from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

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
            <Typography variant="h6">Ablaufplan für {role}</Typography>
            <Timeline position="alternate">
              {events.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(event.date).toLocaleDateString("de-DE")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {event.name}
                    </Typography>
                    <Typography>{`Rolle: ${event.employee}`}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Container>
      </Layout>
    </EventsContext.Provider>
  );
};

export default Schedule;
