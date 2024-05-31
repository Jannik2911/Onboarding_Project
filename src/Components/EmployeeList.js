import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Container, Grid, Box } from '@mui/material';
import Layout from './Layout';

const ContactItem = ({ contact, onRemove }) => (
  <div style={{ display: 'flex', flexDirection: 'column', margin: '8px 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {contact.name}
      {onRemove && <Button variant="contained" color="secondary" onClick={() => onRemove(contact.id)}>Löschen</Button>}
    </div>
    <div style={{ display: 'flex', color: 'grey', fontSize: '0.9em' }}>
      {contact.phone}, FB: {contact.department}
    </div>
  </div>
);

const ContactManagement = () => {
  const initialContacts = [
    { id: '1', name: 'John Doe', phone: '123-456-7890', department: 'HR' },
    { id: '2', name: 'Jane Smith', phone: '987-654-3210', department: 'IT' },
    { id: '3', name: 'Joe Bloggs', phone: '555-555-5555', department: 'Finance' },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'contacts' && destination.droppableId === 'favorites') {
      const draggedContact = contacts[source.index];
      setFavorites([...favorites, draggedContact]);
      setContacts(contacts.filter((_, index) => index !== source.index));
    } else if (source.droppableId === 'favorites' && destination.droppableId === 'contacts') {
      const draggedFavorite = favorites[source.index];
      setContacts([...contacts, draggedFavorite]);
      setFavorites(favorites.filter((_, index) => index !== source.index));
    }
  };

  const removeFavorite = (id) => {
    const removedContact = favorites.find(fav => fav.id === id);
    setFavorites(favorites.filter(fav => fav.id !== id));
    setContacts([...contacts, removedContact]);
  };

  return (
    <Layout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={5}>
              <Droppable droppableId="favorites">
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    sx={{ padding: '16px', border: '1px solid #ccc', backgroundColor: snapshot.isDraggingOver ? '#f0f0f0' : '#fff' }}
                    {...provided.droppableProps}
                  >
                    <h2>Favorisierte Kontakte</h2>
                    {favorites.map((contact, index) => (
                      <Draggable key={contact.id} draggableId={contact.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ContactItem contact={contact} onRemove={removeFavorite} />
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
                    sx={{ padding: '16px', border: '1px solid #ccc', backgroundColor: snapshot.isDraggingOver ? '#f0f0f0' : '#fff' }}
                    {...provided.droppableProps}
                  >
                    <h2>Kontaktbuch</h2>
                    {contacts.map((contact, index) => (
                      <Draggable key={contact.id} draggableId={contact.id} index={index}>
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
