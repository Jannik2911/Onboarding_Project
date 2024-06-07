import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message"; // Import der aktualisierten Message-Komponente

const UserChannel = () => {
  const [input, setInput] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState([]);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : {};
  });
  const [isSendDisabled, setIsSendDisabled] = useState(true);

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
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    setIsSendDisabled(!selectedEmployee);
  }, [selectedEmployee]);

  const handleSend = () => {
    if (input.trim() !== "" && selectedEmployee !== "") {
      const newMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
        timestamp: Date.now() // Hinzufügen des Zeitstempels
      };
      setMessages(prevMessages => {
        const employeeMessages = prevMessages[selectedEmployee.id] || [];
        return {
          ...prevMessages,
          [selectedEmployee.id]: [...employeeMessages, newMessage],
        };
      });
      setInput("");
    }
  };
  
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  return (
    <Box sx={{ height: "inherit", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {selectedEmployee &&
          messages[selectedEmployee.id]?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </Box>
      <Box sx={{ p: 1, backgroundColor: "background.default", mt: "auto" }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Mitarbeiter</InputLabel>
              <Select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                label="Mitarbeiter"
              >
                {mitarbeiter.map((employee) => (
                  <MenuItem key={employee.id} value={employee}>
                    {`${employee.firstName} ${employee.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              size="small"
              placeholder="Neue Nachricht senden"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              sx={{ height: "40px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="small"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
              disabled={isSendDisabled}
              sx={{ height: "40px" }}
            >
              Senden
            </Button>
          </Grid>
        </Grid>
        {!selectedEmployee && (
          <Typography
            variant="body2"
            color="error"
            style={{ textAlign: "left" }}
            sx={{ mt: 1 }}
          >
            Bitte Chat-Partner auswählen
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserChannel;
