import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Sie sind abgemeldet
        </Typography>
        <Typography variant="body1">
          Wenn Sie die Anwendung nutzen möchten, melden Sie sich hier an:
          <br />
        </Typography>
        <Button component={Link} to="/" variant="contained" color="success">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoggedOut;
