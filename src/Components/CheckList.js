import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CheckList() {
  const [checked, setChecked] = React.useState([0]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Speichern der Aufgaben im localStorage, wenn sich die Tasks ändern
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <List sx={{ width: "inherit", height: 250, bgcolor: "background.paper" }}>
      {tasks.map(
        (task, index) =>
          !task.completed &&
          !task.mitarbeiter && (
            <ListItem
              key={index}
              sx={{ border: "1px solid grey", borderRadius: 2, mb: 1 }}
              style={{
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
                  ) : /*new Date() < new Date(task.f)*/ true ? (
                    `Zu erledigen bis zum ${task.f}`
                  ) : (
                    <span style={{ color: "red" }}>
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
