import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import DateCalendarReferenceDate from "./Calendar";
import CheckList from "./CheckList";
import SearchComponent from "./SearchComponent";
import Layout from "./Layout";
import UserChannel from "./UserChannel";

const defaultTheme = createTheme();

export default function Dashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Layout>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "minmax(100px, auto)",
              gap: 3,
            }}
          >
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <Typography component="h1" variant="h6" color="inherit">
                  Anstehende Aufgaben
                </Typography>
                <CheckList />
              </Paper>
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DateCalendarReferenceDate />
              </Paper>
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <SearchComponent />
              </Paper>
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <UserChannel />
              </Paper>
            </Box>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
