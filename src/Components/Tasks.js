import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "./Layout";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        if (!task.completed) {
          return {
            ...task,
            completed: true,
            completedAt: new Date().toLocaleString("de-DE"),
          };
        } else {
          return { ...task, completed: false, completedAt: undefined };
        }
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <Layout headerText={"Aufgaben für neue Mitarbeiter"}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              <TextField
                label="Neue Aufgabe"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? addTask() : null)}
                fullWidth
              />
              <Button
                onClick={addTask}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Hinzufügen
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              <List>
                {tasks.map((task, index) => (
                  <ListItem
                    key={index}
                    sx={{ border: "1px solid grey", borderRadius: 2, mb: 1 }}
                    style={{
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => toggleCompletion(index)}
                        sx={{
                          color: "primary.main",
                          "&.Mui-checked": { color: "primary.main" },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.text}
                        </span>
                      }
                      secondary={
                        task.completed
                          ? `Aufgabe erledigt am ${task.completedAt}`
                          : ""
                      }
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default TodoList;
