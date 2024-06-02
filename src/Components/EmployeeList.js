import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Container, Grid, Box, Menu, MenuItem, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField as MUITextField, Select, InputLabel, FormControl } from "@mui/material";
import Layout from "./Layout";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ContactItem = ({ contact, onRemove }) => (
  <div style={{ display: "flex", flexDirection: "column", margin: "8px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ textAlign: "left" }}>
        <div>{`${contact.firstName} ${contact.lastName}`}</div>
        <div style={{ fontSize: "0.9em", textAlign: "left" }}>
          {contact.phone}, FB: {contact.department}
        </div>
      </div>
      {onRemove && (
        <Button
          style={{ alignSelf: "center" }}
          variant="contained"
          color="secondary"
          onClick={() => onRemove(contact.id)}
        >
          Löschen
        </Button>
      )}
    </div>
  </div>
);

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterField, setFilterField] = useState("firstName");
  const [filterTerm, setFilterTerm] = useState("");
  const [allContacts, setAllContacts] = useState([]); // Store all contacts separately

  useEffect(() => {
    fetch("http://localhost:8000/names")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setAllContacts(data); // Initialize allContacts with the fetched data
        localStorage.setItem("contacts", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "contacts" &&
      destination.droppableId === "favorites"
    ) {
      const draggedContact = contacts[source.index];
      setFavorites([...favorites, draggedContact]);
      setContacts(contacts.filter((_, index) => index !== source.index));
    } else if (
      source.droppableId === "favorites" &&
      destination.droppableId === "contacts"
    ) {
      const draggedFavorite = favorites[source.index];
      setContacts([...contacts, draggedFavorite]);
      setFavorites(favorites.filter((_, index) => index !== source.index));
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setContacts(allContacts); // Reset to all contacts if search term is cleared
    } else {
      const filtered = allContacts.filter((element) => {
        return (
          element.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          element.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setContacts(filtered);
    }
  }, [searchTerm, allContacts]);

  useEffect(() => {
    if (filterTerm === "") {
      setContacts(allContacts); // Reset to all contacts if filter term is cleared
    } else {
      const filtered = allContacts.filter((element) => {
        return (
          element[filterField].toLowerCase().includes(filterTerm.toLowerCase())
        );
      });
      setContacts(filtered);
    }
  }, [filterTerm, filterField, allContacts]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleFilterFieldChange = (event) => {
    setFilterField(event.target.value);
  };

  const removeFavorite = (id) => {
    const removedContact = favorites.find((fav) => fav.id === id);
    setFavorites(favorites.filter((fav) => fav.id !== id));
    setContacts([...contacts, removedContact]);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterClose = () => {
    setFilterDialogOpen(false);
  };

  const sortByFirstNameAZ = () => {
    const sortedContacts = [...contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));
    setContacts(sortedContacts);
    handleSortClose();
  };

  const sortByFirstNameZA = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.firstName.localeCompare(a.firstName));
    setContacts(sortedContacts);
    handleSortClose();
  };

  const sortByLastNameAZ = () => {
    const sortedContacts = [...contacts].sort((a, b) => a.lastName.localeCompare(b.lastName));
    setContacts(sortedContacts);
    handleSortClose();
  };

  const sortByLastNameZA = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.lastName.localeCompare(a.lastName));
    setContacts(sortedContacts);
    handleSortClose();
  };

  return (
    <Layout headerText={"Kontaktbuch"}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={5}>
              <Droppable droppableId="favorites">
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    sx={{
                      padding: "16px",
                      border: "1px solid #ccc",
                      backgroundColor: snapshot.isDraggingOver
                        ? "#f0f0f0"
                        : "#fff",
                    }}
                    {...provided.droppableProps}
                  >
                    <h2>Favorisierte Kontakte</h2>
                    {favorites.map((contact, index) => (
                      <Draggable
                        key={`${contact.id}-favorites`} // Ensure unique key
                        draggableId={`${contact.id}-favorites`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ContactItem
                              contact={contact}
                              onRemove={removeFavorite}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
            <Grid item xs={5}>
              <Droppable droppableId="contacts">
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    sx={{
                      padding: "16px",
                      border: "1px solid #ccc",
                      backgroundColor: snapshot.isDraggingOver
                        ? "#f0f0f0"
                        : "#fff",
                    }}
                    {...provided.droppableProps}
                  >
                    <h2>Kontaktbuch</h2>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TextField
                        id="search"
                        type="search"
                        label="Suche"
                        value={searchTerm}
                        onChange={handleChange}
                        sx={{ width: "50%" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSortClick}
                        sx={{ ml: 2 }}
                      >
                        <SwapVertIcon />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleFilterClick}
                        sx={{ ml: 2 }}
                      >
                        <FilterAltIcon />
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleSortClose}
                      >
                        <MenuItem onClick={sortByLastNameAZ}>Name (a-z)</MenuItem>
                        <MenuItem onClick={sortByLastNameZA}>Name (z-a)</MenuItem>
                        <MenuItem onClick={sortByFirstNameAZ}>Vorname (a-z)</MenuItem>
                        <MenuItem onClick={sortByFirstNameZA}>Vorname (z-a)</MenuItem>
                      </Menu>
                    </Box>
                    {contacts?.map((contact, index) => (
                      <Draggable
                        key={`${contact.id}-${index}`}
                        draggableId={`${contact.id}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ContactItem contact={contact} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </Container>
      </DragDropContext>

      <Dialog open={filterDialogOpen} onClose={handleFilterClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Geben Sie den Begriff ein, nach dem Sie filtern möchten.
          </DialogContentText>
          <FormControl fullWidth margin="dense">
            <InputLabel id="filter-field-label">Feld</InputLabel>
            <Select
              labelId="filter-field-label"
              id="filter-field"
              value={filterField}
              label="Feld"
              onChange={handleFilterFieldChange}
            >
              <MenuItem value="lastName">Name</MenuItem>
              <MenuItem value="firstName">Vorname</MenuItem>
              <MenuItem value="phone">Telefonnummer</MenuItem>
              <MenuItem value="department">Fachbereich</MenuItem>
            </Select>
          </FormControl>
          <MUITextField
            autoFocus
            margin="dense"
            id="filter"
            label="Begriff"
            type="text"
            fullWidth
            value={filterTerm}
            onChange={handleFilterChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleFilterClose} color="primary">
            Filtern
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ContactManagement;
