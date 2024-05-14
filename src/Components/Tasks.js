import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, IconButton, Checkbox, TextField, Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        // Laden der Aufgaben aus dem localStorage beim Initialisieren
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        // Speichern der Aufgaben im localStorage, wenn sich die Tasks ändern
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (input) {
            setTasks([...tasks, { text: input, completed: false }]);
            setInput('');
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
                    return { ...task, completed: true, completedAt: new Date().toLocaleString("de-DE") };
                } else {
                    return { ...task, completed: false, completedAt: undefined };
                }
            }
            return task;
        });
        setTasks(newTasks);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 2, pt: 1, pb: 1, boxShadow: 3, backgroundColor: 'primary.main', color: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Aufgaben für neue Mitarbeiter
                </Typography>
            </Box>
            <Box sx={{ mb: 4, p: 3, boxShadow: 3 }}>
                <TextField
                    label="Neue Aufgabe"
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? addTask() : null}
                    fullWidth
                />
                <Button onClick={addTask} variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}>
                    Hinzufügen
                </Button>
                <List>
                    {tasks.map((task, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={task.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={() => toggleCompletion(index)}
                                    sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={<span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>}
                                secondary={task.completed ? `Aufgabe erledigt am ${task.completedAt}` : ''}
                            />
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default TodoList;
