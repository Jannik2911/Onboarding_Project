import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { styled } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import Layout from "./Layout";

const useStyles = styled({
  calendarContainer: {
    width: 300,
    height: 300,
    position: "flex"
  },
});

function hasEvent(events, date) {
  return events.some(
    (event) =>
      dayjs(event.start).isSame(date, "day") ||
      (dayjs(event.start).isBefore(date, "day") &&
        dayjs(event.end).isAfter(date, "day"))
  );
}

function ServerDay(props) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    events,
    ...other
  } = props;

  const isSelected = !outsideCurrentMonth && hasEvent(events, day);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "👥" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
  };

  return (
    <div className={classes.calendarContainer}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          loading={isLoading}
          onMonthChange={handleMonthChange}
          sx={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (props) => <ServerDay {...props} events={events} />,
          }}
          slotProps={{
            day: {
              highlightedDays: events.map((event) => dayjs(event.start).date()),
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
