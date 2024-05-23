import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © Projektgruppe DRV-Westfalen"}
      <Link color="inherit" href="/"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "inherit",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          color: "inherit",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1"></Typography>
          Jannik Linde, Niklas Cinar, Julian Heinze
          <br />
          Nur für den internen Gebrauch
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
