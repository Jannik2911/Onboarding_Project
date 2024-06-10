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
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    const selectedNames = event.target.value;
    if (selectedNames.includes("")) {
      setItems([]);
      setMid([]);
    } else {
      setItems(selectedNames);
      setMid(selectedNames.map(name => `${name.firstName} ${name.lastName}`));
    }
  };

  return (
    <Box sx={{ minWidth: 120, mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mitarbeiter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={items}
          label="Mitarbeiter"
          onChange={handleChange}
          sx={{ textAlign: "left" }}
          renderValue={(selected) => selected.map((item) => `${item.firstName} ${item.lastName}`).join(', ')}
        >
          <MenuItem value="">
            <em>Ohne Zuweisung</em>
          </MenuItem>
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
  const [mid, setMid] = useState([]);

  const [mitarbeiter, setMitarbeiter] = useState([]);
  const [currentUser, setCurrentUser] = useState({ firstName: "Current", lastName: "User" });

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
          mitarbeiter: mid.length > 0 ? mid : [],
          status: "offen", // Setze den Status auf "offen" beim Hinzufügen einer neuen Aufgabe
        },
      ]);
      setInput("");
      setMid([]);
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
        const assignedUsers = Array.isArray(task.mitarbeiter) ? task.mitarbeiter : [];
        const currentUserName = `${currentUser.firstName} ${currentUser.lastName}`;
        if (assignedUsers.length === 0 || assignedUsers.includes(currentUserName)) {
          const newStatus = task.completed ? "offen" : "abgeschlossen";
          return {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toLocaleString("de-DE") : undefined,
            status: newStatus,
          };
        }
      }
      return task;
    });
    setTasks(newTasks);
  };

  const getStatus = (task) => {
    if (task.completed) {
      return "abgeschlossen";
    } else if (new Date(task.f) < new Date()) {
      return "überfällig";
    } else {
      return "in Bearbeitung";
    }
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
                        disabled={
                          task.mitarbeiter.length > 0 &&
                          !task.mitarbeiter.includes(`${currentUser.firstName} ${currentUser.lastName}`)
                        }
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
                          {Array.isArray(task.mitarbeiter) && task.mitarbeiter.length > 0 && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                            >{`Zugewiesen an: ${task.mitarbeiter.join(', ')}`}</Typography>
                          )}
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >{`Status: ${getStatus(task)}`}</Typography>
                          {task.completed ? (
                            `Aufgabe erledigt am ${task.completedAt}`
                          ) : new Date(task.f) > new Date() ? (
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
