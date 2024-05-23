import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainListItems from "../Helper/listItems";
import Popover from "@mui/material/Popover";
import { useState, useEffect, useContext } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Footer from "./Footer";
import { AdminContext } from "./AdminContext";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Layout({ children, headerText }) {
  const [open, setOpen] = useState(true);
  const [arr, setArr] = useState([]);

  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetch("http://localhost:8000/notifications")
      .then((res) => res.json())
      .then((data) => {
        setArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notificationsOpen = Boolean(anchorEl);
  const id = notificationsOpen ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {headerText ? headerText : "Onboarding-Tool Dashboard"}
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={arr.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={notificationsOpen}
              anchorEl={anchorEl}
              onClose={handleNotificationsClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Box p={2}>
                <div key="notifications-heading">
                  <Typography variant="h6" fontWeight="bold">
                    Sie haben {arr.length} Benachrichtigungen
                  </Typography>
                  <Divider />
                </div>
                {arr?.map((value) => (
                  <div key={value.id}>
                    <Typography variant="body1">
                      <CommentIcon /> {`${" " + value.text}`}
                    </Typography>
                    {value.id < arr.length && <Divider />}
                  </div>
                ))}
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
              Eingeloggt als: {isAdmin ? "Admin" : "Benutzer"}
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            mt: "50px",
            height: "calc(100vh - 50px)",
            overflow: "auto",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
