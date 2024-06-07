import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { AdminContext } from "./AdminContext";
import { LoginContext } from "./LoginContext";
import { useContext } from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function Login() {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        data.map((user) => {
          if (
            user.name === form.get("name") &&
            user.password === form.get("password")
          ) {
            setIsLoggedIn(true);

            if (user.admin === true) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }

            routeChange("/dashboard");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          component="img"
          sx={{
            width: "100%",
            maxWidth: "500px",
            objectFit: "scale-down",
          }}
          src={"/logo.png"}
          alt={"alt"}
        />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nutzername"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Passwort vergessen
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
