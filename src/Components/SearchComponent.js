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
  const [arr, setArr] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8000/names")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filtered = arr?.filter((element) => {
      return element.name.toLowerCase().includes(searchTerm.toLowerCase());
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
      <h2>Mitarbeiter-Schnellsuche</h2>
      <TextField
        id="search"
        type="search"
        label="Suche"
        value={searchTerm}
        onChange={handleChange}
        sx={({ width: 600 }, { textAlign: "center" })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List
        sx={
          ({ width: "100%", maxWidth: 360, bgcolor: "background.paper" },
          { textAlign: "center" })
        }
      >
        {filteredArr?.map((value) => (
          <ListItem
            key={value.id}
            disableGutters
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
            <ListItemText primary={`${value.name}`} />
          </ListItem>
        ))}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Aktion auswählen</h2>
          <p id="parent-modal-description">
            {selectedItem?.name + ", ID: " + selectedItem?.id}
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchComponent;
