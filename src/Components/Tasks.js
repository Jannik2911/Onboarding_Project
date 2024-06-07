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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ mitarbeiter, setMid }) => {
  const [item, setItem] = useState("");

  const handleChange = (event) => {
    const selectedName = event.target.value;
    setItem(selectedName);
    setMid(`${event.target.value.firstName} ${event.target.value.lastName}`);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mitarbeiter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          label="Mitarbeiter"
          onChange={handleChange}
          sx={{ textAlign: "left" }}
        >
          {mitarbeiter?.map((value) => (
            <MenuItem key={value.id} value={value} sx={{ textAlign: "left" }}>
              {`${value.firstName} ${value.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const TodoList = () => {
  const [frist, setFrist] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [mid, setMid] = useState("");

  const [mitarbeiter, setMitarbeiter] = useState([]);

  useEffect(() => {
    const fetchMitarbeiter = async () => {
      try {
        const response = await fetch("http://localhost:8000/names");
        const data = await response.json();
        setMitarbeiter(data);
      } catch (error) {
        console.error("Error fetching mitarbeiter data:", error);
      }
    };

    fetchMitarbeiter();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input) {
      setTasks([
        ...tasks,
        {
          text: input,
          completed: false,
          f: new Date(frist).toLocaleString("de-DE"),
          mitarbeiter: mid,
        },
      ]);
      setInput("");
      setMid("");
      setFrist("");
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
              <TextField
                fullWidth
                required
                type="datetime-local"
                value={frist}
                sx={{ mt: 1 }}
                onChange={(e) => setFrist(e.target.value)}
              />
              <BasicSelect mitarbeiter={mitarbeiter} setMid={setMid} />
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
                        <>
                          {task.mitarbeiter && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                            >{`Zugewiesen an: ${task.mitarbeiter}`}</Typography>
                          )}
                          {task.completed ? (
                            `Aufgabe erledigt am ${task.completedAt}`
                          ) : /*new Date() < new Date(task.f)*/ true ? (
                            `Zu erledigen bis zum ${task.f}`
                          ) : (
                            <span style={{ color: "red" }}>
                              {`Zu erledigen bis zum ${task.f}`}
                            </span>
                          )}
                        </>
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
};

export default TodoList;
