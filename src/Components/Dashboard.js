import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DateCalendarReferenceDate from "./Calendar";
import CheckList from "./CheckList";
import SearchComponent from "./SearchComponent";
import Layout from "./Layout";

export default function Dashboard() {
  return (
    <Layout>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,

          mt: "50px",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: 1120,
                  height: 300,
                }}
              >
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  sx={{ flexGrow: 1 }}
                >
                  Anstehende Aufgaben
                </Typography>
                <CheckList />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: 350,
                  height: 300,
                  ml: "380px",
                }}
              >
                <DateCalendarReferenceDate />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <SearchComponent />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
