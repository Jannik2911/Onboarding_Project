import Layout from "./Layout";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SearchComponent from "./SearchComponent";

const EmployeeList = () => {
  return (
    <Layout>
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
                height: "70vh",
              }}
            ></Paper>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchComponent source="verzeichnis" />;
            </Paper>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default EmployeeList;
