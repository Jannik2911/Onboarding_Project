import Layout from "./Layout";
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, TextField, List, ListItem, ListItemText } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function EmployeeList() {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John Doe', phone: '123-456-7890' },
    { id: '2', name: 'Jane Smith', phone: '234-567-8901' },
    { id: '3', name: 'Mike Johnson', phone: '345-678-9012' }
  ]);

  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'contacts' && result.destination.droppableId === 'favorites') {
      const movedContact = contacts.find(contact => contact.id === result.draggableId);
      setFavorites([...favorites, movedContact]);
    } else if (result.source.droppableId === 'favorites' && result.destination.droppableId === 'contacts') {
      setFavorites(favorites.filter(contact => contact.id !== result.draggableId));
    }
  };

  return (
    <Layout headerText={"Mitarbeiterverzeichnis"}>
      <Container>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box border={1} padding={2}>
                <h2>Favorisierte Kontakte</h2>
                <Droppable droppableId="favorites">
                  {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                      {favorites.map((contact, index) => (
                        <Draggable key={contact.id} draggableId={contact.id} index={index}>
                          {(provided) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ListItemText primary={contact.name} secondary={contact.phone} />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box border={1} padding={2}>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Droppable droppableId="contacts">
                  {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                      {filteredContacts.map((contact, index) => (
                        <Draggable key={contact.id} draggableId={contact.id} index={index}>
                          {(provided) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ListItemText primary={contact.name} secondary={contact.phone} />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Box>
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
    </Layout>
  );
}

export default EmployeeList;
