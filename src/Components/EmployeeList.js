import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Container, Grid, Box, Divider } from "@mui/material";
import Layout from "./Layout";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const ContactItem = ({ contact, onRemove }) => (
  <div style={{ display: "flex", flexDirection: "column", margin: "8px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ textAlign: "left" }}>
        <div>{contact.name}</div>
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

  useEffect(() => {
    fetch("http://localhost:8000/names")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
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
    if (contacts.length > 0) {
      const filtered = contacts.filter((element) => {
        return element.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setContacts(filtered);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeFavorite = (id) => {
    const removedContact = favorites.find((fav) => fav.id === id);
    setFavorites(favorites.filter((fav) => fav.id !== id));
    setContacts([...contacts, removedContact]);
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
    </Layout>
  );
};

export default ContactManagement;
