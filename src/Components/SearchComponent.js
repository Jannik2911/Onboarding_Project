import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

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

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArr, setFilteredArr] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [arr, setArr] = useState(() => {
    const saved = localStorage.getItem("mitarbeiter");
    return saved ? JSON.parse(saved) : [];
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = () => {
    console.log("Ereignis erstellen");
  };

  const handleTaskClick = () => {
    console.log("Ereignis erstellen");
  };

  useEffect(() => {
    console.log(arr);
    const filtered = arr?.filter((element) => {
      return element.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredArr(filtered);
  }, [searchTerm, arr]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Mitarbeiter-Schnellsuche
      </Typography>
      <TextField
        id="search"
        type="search"
        label="Suche"
        value={searchTerm}
        onChange={handleChange}
        sx={({ width: 500 }, { textAlign: "center" })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          textAlign: "center",
          maxHeight: 290, // Set a fixed height for scrollability
          overflow: "auto", // Enable scrolling
          margin: "auto", // Center the list horizontally
        }}
      >
        {filteredArr?.map((value) => (
          <Box
            key={value.id}
            sx={{
              width: "100%", // Inherit the width of the list container
              border: "1px solid grey",
              borderRadius: 2,
              mb: 1,
              overflow: "auto",
            }}
          >
            <ListItem
              onClick={() => handleItemClick(value)}
              onMouseEnter={() => setHoveredItem(value)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={selectedItem === value ? { border: "1px solid grey" } : {}}
              style={{
                boxShadow:
                  hoveredItem === value
                    ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
                    : "none",
              }}
              secondaryAction={
                <IconButton aria-label="comment" onClick={handleOpen}>
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${value.name}` + " " + `${value.lastname}`}/>
            </ListItem>
          </Box>
        ))}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            Aktion auswählen für {selectedItem?.name} aus Fachbereich:{" "}
            {selectedItem?.fb}
          </h2>
          <Button variant="contained" onClick={handleActionClick}>
            Ereignis erstellen
          </Button>
          <Button
            sx={{ mt: "15px" }}
            variant="contained"
            onClick={handleTaskClick}
          >
            Aufgabe hinzufügen
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchComponent;
