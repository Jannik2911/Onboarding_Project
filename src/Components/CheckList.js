import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function CheckList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  return (
    <List sx={{ width: "inherit", height: 250, bgcolor: "background.paper" }}>
      {tasks.map(
        (task, index) =>
          !task.completed &&
          task.mitarbeiter.length === 0 && (
            <ListItem
              key={index}
              sx={{
                border: "1px solid grey",
                borderRadius: 2,
                mb: 1,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemText
                primary={
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                }
                secondary={
                  task.completed ? (
                    `Aufgabe erledigt am ${task.completedAt}`
                  ) : (
                    <span
                      style={{
                        color:
                          new Date() < new Date(task.f) ? "inherit" : "red",
                      }}
                    >
                      {`Zu erledigen bis zum ${task.f}`}
                    </span>
                  )
                }
              />
            </ListItem>
          )
      )}
    </List>
  );
}
