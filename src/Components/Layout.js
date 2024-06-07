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
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import LoggedOut from "./LoggedOut";
import SvgIcon from "@mui/material/SvgIcon";

const MySvgIcon = () => {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="81"
        viewBox="0 0 300 81"
        version="1.1"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          transform: "scale(5) translateX(-85%)",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421",
        }}
      >
        <path
          d="M14.023,0.018c-10.411,0.535 -13.994,5.125 -13.994,13.928l0,27.989c0,0 5.148,-4.47 14.902,-4.47l44.38,0c8.745,0 17.494,-2.886 17.494,-13.153l0,-11.595c0,-9.043 -3.27,-12.699 -13.671,-12.699l-46.907,0c-0.755,0 -1.509,-0.041 -2.204,0Zm91.481,0.712l0,15.484l5.573,0c1.597,0 3.002,-0.466 4.016,-1.49c1.733,-1.735 1.555,-3.96 1.555,-6.284c0,-2.324 0.187,-4.478 -1.555,-6.22c-1.014,-1.022 -2.419,-1.49 -4.016,-1.49l-5.573,0Zm67.706,0l0,15.484l2.784,0l0,-6.932c0,-1.477 0.929,-1.943 1.814,-1.943c0.892,0 1.881,0.446 1.881,1.943l0,6.932l2.784,0l0,-7.32c0,-2.388 -1.298,-4.147 -3.757,-4.147c-0.997,0 -1.967,0.448 -2.722,1.232l0,-5.249l-2.784,0Zm-28.897,1.167l0,3.304l-1.165,0l0,2.202l1.165,0l0,5.573c0,1.605 1.01,3.238 3.305,3.238l1.491,0l0,-2.396l-0.973,0c-0.669,0 -0.972,-0.384 -0.972,-1.037l0,-5.378l1.945,0l0,-2.202l-1.945,0l0,-3.304l-2.851,0Zm-35.827,1.555l2.268,0c1.034,0 1.745,0.344 2.266,0.972c0.564,0.692 0.649,1.671 0.649,4.016c0,2.349 -0.083,3.452 -0.649,4.146c-0.521,0.631 -1.232,0.973 -2.266,0.973l-2.268,0l0,-10.107Zm15.418,1.295c-2.917,0 -4.924,2.14 -4.924,5.83c0,4.582 2.592,5.768 5.25,5.768c2.032,0 3.13,-0.599 4.275,-1.75l-1.75,-1.685c-0.715,0.713 -1.296,1.036 -2.525,1.036c-1.578,0 -2.463,-1.067 -2.463,-2.525l7.061,0l0,-1.231c0,-3.108 -1.789,-5.443 -4.924,-5.443Zm32.007,0c-2.293,0 -4.342,1.282 -4.342,3.629c0,2.083 1.275,2.981 3.305,3.174l1.75,0.186c0.889,0.083 1.229,0.471 1.229,1.037c0,0.846 -1.036,1.165 -2.007,1.165c-0.864,0 -2.054,-0.166 -2.981,-1.101l-1.878,1.879c1.422,1.434 3.023,1.621 4.793,1.621c2.66,0 4.796,-1.196 4.796,-3.695c0,-1.909 -1.143,-3.085 -3.369,-3.302l-1.75,-0.187c-0.995,-0.083 -1.165,-0.562 -1.165,-0.972c0,-0.564 0.497,-1.101 1.619,-1.101c0.972,0 1.944,0.186 2.591,0.777l1.75,-1.75c-1.076,-1.02 -2.594,-1.36 -4.341,-1.36Zm11.467,0c-2.25,0 -4.988,1.249 -4.988,5.83c0,4.582 2.738,5.768 4.988,5.768c1.553,0 2.763,-0.514 3.759,-1.555l-1.945,-1.88c-0.585,0.632 -1.08,0.908 -1.814,0.908c-0.674,0 -1.143,-0.28 -1.555,-0.778c-0.431,-0.543 -0.647,-1.268 -0.647,-2.463c0,-1.194 0.216,-1.984 0.647,-2.525c0.412,-0.499 0.881,-0.713 1.555,-0.713c0.734,0 1.229,0.214 1.814,0.842l1.945,-1.879c-0.996,-1.04 -2.206,-1.555 -3.759,-1.555Zm22.418,0c-2.915,0 -4.86,2.14 -4.86,5.83c0,4.582 2.525,5.768 5.183,5.768c2.03,0 3.124,-0.599 4.275,-1.75l-1.683,-1.685c-0.712,0.713 -1.358,1.036 -2.592,1.036c-1.576,0 -2.463,-1.067 -2.463,-2.525l7.063,0l0,-1.231c0,-3.108 -1.787,-5.443 -4.923,-5.443Zm-58.569,0.125l0,7.256c0,1.238 0.259,2.326 1.165,3.241c0.626,0.628 1.534,0.972 2.656,0.972c1.037,0 2.05,-0.386 2.786,-1.167l0,1.036l2.787,0l0,-11.338l-2.851,0l0,6.868c0,1.545 -0.993,2.074 -1.878,2.074c-0.883,0 -1.814,-0.529 -1.814,-2.074l0,-6.868l-2.851,0Zm-7.323,2.268c0.95,0 1.576,0.493 1.881,1.167c0.166,0.413 0.238,0.664 0.259,1.165l-4.277,0c0.021,-0.501 0.083,-0.752 0.259,-1.165c0.301,-0.674 0.927,-1.167 1.878,-1.167Zm65.892,0c0.951,0 1.577,0.493 1.878,1.167c0.187,0.413 0.238,0.664 0.259,1.165l-4.277,0c0.021,-0.501 0.083,-0.752 0.259,-1.165c0.307,-0.674 0.931,-1.167 1.881,-1.167Zm27.403,14.772l0,2.268l2.851,0l0,-2.268l-2.851,0Zm-111.695,0.062l0,15.485l2.982,0l0,-6.156l2.201,0l2.982,6.156l3.497,0l-3.433,-6.674c1.495,-0.541 2.786,-1.907 2.786,-4.08c0,-2.587 -1.853,-4.731 -4.988,-4.731l-6.027,0Zm127.894,0l0,15.485l2.85,0l0,-6.933c0,-1.478 0.927,-1.943 1.814,-1.943c0.888,0 1.814,0.444 1.814,1.943l0,6.933l2.787,0l0,-7.321c0,-2.388 -1.298,-4.146 -3.759,-4.146c-0.995,0 -1.903,0.388 -2.656,1.165l0,-5.183l-2.85,0Zm-89.539,1.167l0,3.305l-1.165,0l0,2.202l1.165,0l0,5.572c0,1.607 1.014,3.239 3.305,3.239l1.49,0l0,-2.397l-0.972,0c-0.67,0 -0.972,-0.381 -0.972,-1.036l0,-5.378l1.944,0l0,-2.202l-1.944,0l0,-3.305l-2.851,0Zm-35.373,1.555l2.85,0c1.321,0 2.202,0.817 2.202,2.009c0,1.194 -0.881,2.073 -2.202,2.073l-2.85,0l0,-4.082Zm14.966,1.296c-2.919,0 -4.924,2.075 -4.924,5.765c0,4.589 2.588,5.832 5.248,5.832c2.025,0 3.134,-0.601 4.275,-1.749l-1.748,-1.686c-0.713,0.72 -1.298,1.037 -2.527,1.037c-1.582,0 -2.463,-1.074 -2.463,-2.525l7.063,0l0,-1.232c0,-3.106 -1.791,-5.442 -4.924,-5.442Zm13.022,0c-1.038,0 -2.048,0.388 -2.786,1.165l0,-1.037l-2.787,0l0,11.339l2.851,0l0,-6.867c0,-1.542 0.993,-2.009 1.881,-2.009c0.883,0 1.814,0.467 1.814,2.009l0,6.867l2.85,0l0,-7.256c0,-1.236 -0.259,-2.26 -1.167,-3.175c-0.62,-0.63 -1.53,-1.036 -2.656,-1.036Zm18.983,0c-2.913,0 -4.924,2.075 -4.924,5.765c0,4.589 2.587,5.832 5.247,5.832c2.032,0 3.127,-0.601 4.277,-1.749l-1.75,-1.686c-0.709,0.72 -1.289,1.037 -2.527,1.037c-1.575,0 -2.461,-1.074 -2.461,-2.525l7.062,0l0,-1.232c0,-3.106 -1.792,-5.442 -4.924,-5.442Zm13.022,0c-1.037,0 -2.051,0.388 -2.785,1.165l0,-1.037l-2.786,0l0,11.339l2.851,0l0,-6.867c0,-1.542 0.991,-2.009 1.878,-2.009c0.883,0 1.814,0.467 1.814,2.009l0,6.867l2.851,0l0,-7.256c0,-1.236 -0.257,-2.26 -1.165,-3.175c-0.629,-0.63 -1.53,-1.036 -2.658,-1.036Zm21.704,0c-2.913,0 -4.924,2.075 -4.924,5.765c0,4.589 2.523,5.832 5.183,5.832c2.026,0 3.129,-0.601 4.277,-1.749l-1.685,-1.686c-0.709,0.72 -1.296,1.037 -2.527,1.037c-1.576,0 -2.461,-1.074 -2.461,-2.525l6.997,0l0,-1.232c0,-3.106 -1.723,-5.442 -4.86,-5.442Zm13.022,0c-1.206,0 -2.309,0.582 -2.85,1.231l0,-1.103l-2.721,0l0,11.339l2.787,0l0,-6.802c0,-1.437 0.951,-2.074 1.814,-2.074c0.491,0 0.862,0.104 1.165,0.324l1.878,-2.333c-0.603,-0.414 -1.241,-0.582 -2.073,-0.582Zm7.064,0c-2.291,0 -4.342,1.283 -4.342,3.628c0,2.086 1.209,2.979 3.239,3.174l1.814,0.187c0.889,0.083 1.167,0.468 1.167,1.036c0,0.846 -1.032,1.165 -2.009,1.165c-0.86,0 -2.05,-0.165 -2.979,-1.1l-1.814,1.878c1.424,1.435 3.023,1.621 4.793,1.621c2.658,0 4.729,-1.196 4.729,-3.694c0,-1.908 -1.08,-3.087 -3.303,-3.303l-1.814,-0.187c-0.999,-0.083 -1.167,-0.559 -1.167,-0.972c0,-0.564 0.498,-1.101 1.619,-1.101c0.975,0 1.945,0.187 2.592,0.778l1.75,-1.75c-1.08,-1.018 -2.521,-1.36 -4.275,-1.36Zm17.363,0c-2.249,0 -5.055,1.182 -5.055,5.765c0,4.589 2.806,5.832 5.055,5.832c1.557,0 2.699,-0.512 3.692,-1.554l-1.878,-1.881c-0.589,0.63 -1.078,0.908 -1.814,0.908c-0.672,0 -1.211,-0.278 -1.621,-0.777c-0.429,-0.543 -0.647,-1.333 -0.647,-2.528c0,-1.194 0.218,-1.917 0.647,-2.46c0.41,-0.498 0.949,-0.714 1.621,-0.714c0.736,0 1.225,0.212 1.814,0.842l1.878,-1.878c-0.993,-1.041 -2.135,-1.555 -3.692,-1.555Zm22.416,0c-2.919,0 -4.924,2.075 -4.924,5.765c0,4.589 2.527,5.832 5.183,5.832c2.03,0 3.132,-0.601 4.277,-1.749l-1.686,-1.686c-0.709,0.72 -1.3,1.037 -2.527,1.037c-1.578,0 -2.461,-1.074 -2.461,-2.525l6.997,0l0,-1.232c0,-3.106 -1.727,-5.442 -4.859,-5.442Zm13.022,0c-1.207,0 -2.31,0.582 -2.851,1.231l0,-1.103l-2.72,0l0,11.339l2.786,0l0,-6.802c0,-1.437 0.95,-2.074 1.814,-2.074c0.492,0 0.859,0.104 1.166,0.324l1.878,-2.333c-0.601,-0.414 -1.242,-0.582 -2.073,-0.582Zm21.25,0c-1.036,0 -2.112,0.388 -2.85,1.165l0,-1.037l-2.721,0l0,11.339l2.787,0l0,-6.867c0,-1.542 0.997,-2.009 1.878,-2.009c0.89,0 1.879,0.467 1.879,2.009l0,6.867l2.786,0l0,-7.256c0,-1.236 -0.187,-2.26 -1.101,-3.175c-0.63,-0.63 -1.532,-1.036 -2.658,-1.036Zm10.238,0c-1.101,0 -2.09,0.408 -2.722,1.036c-1.056,1.066 -1.166,2.497 -1.166,4.47c0,1.98 0.104,3.407 1.166,4.47c0.632,0.63 1.555,1.037 2.658,1.037c1.105,0 1.984,-0.338 2.72,-1.165l0,1.165c0,1.153 -0.587,2.332 -2.269,2.332c-0.955,0 -1.575,-0.236 -2.201,-0.842l-1.75,1.75c1.165,1.13 2.349,1.491 4.082,1.491c3.025,0 4.924,-1.953 4.924,-4.665l0,-10.951l-2.722,0l0,1.103c-0.782,-0.87 -1.53,-1.231 -2.72,-1.231Zm-120.766,0.124l4.147,11.339l2.202,0l4.146,-11.339l-2.979,0l-2.268,6.997l-2.268,-6.997l-2.98,0Zm43.474,0l0,11.339l2.784,0l0,-11.339l-2.784,0Zm49.173,0l0,7.256c0,1.244 0.257,2.327 1.167,3.241c0.622,0.632 1.532,0.972 2.656,0.972c1.036,0 2.11,-0.381 2.85,-1.167l0,1.037l2.722,0l0,-11.339l-2.85,0l0,6.869c0,1.542 -0.995,2.073 -1.881,2.073c-0.885,0 -1.814,-0.531 -1.814,-2.073l0,-6.869l-2.85,0Zm-142.987,2.204c0.952,0 1.574,0.558 1.879,1.232c0.166,0.412 0.236,0.665 0.259,1.165l-4.277,0c0.02,-0.5 0.083,-0.753 0.259,-1.165c0.303,-0.674 0.931,-1.232 1.88,-1.232Zm32.005,0c0.949,0 1.575,0.558 1.878,1.232c0.166,0.412 0.238,0.665 0.259,1.165l-4.275,0c0.021,-0.5 0.083,-0.753 0.259,-1.165c0.299,-0.674 0.927,-1.232 1.879,-1.232Zm34.726,0c0.95,0 1.574,0.558 1.879,1.232c0.165,0.412 0.238,0.665 0.259,1.165l-4.275,0c0.021,-0.5 0.083,-0.753 0.259,-1.165c0.305,-0.674 0.927,-1.232 1.878,-1.232Zm59.865,0c0.951,0 1.571,0.558 1.878,1.232c0.166,0.412 0.238,0.665 0.259,1.165l-4.275,0c0.021,-0.5 0.083,-0.753 0.259,-1.165c0.299,-0.674 0.925,-1.232 1.879,-1.232Zm45.287,0.259c1.667,0 1.879,1.418 1.879,2.915c0,1.501 -0.212,2.915 -1.879,2.915c-1.656,0 -1.878,-1.414 -1.878,-2.915c0,-1.497 0.222,-2.915 1.878,-2.915Z"
          style={{ fill: "#6982a2", fillRule: "nonzero" }}
        />
        <path
          d="M76.809,38.8l0,28.012c0,9.395 -4.151,13.959 -16.231,13.959l-46.911,0c-10.402,0 -13.667,-3.711 -13.667,-12.753l0,-11.624c0,-10.269 8.764,-13.155 17.506,-13.155c0,0 35.384,0 44.353,0c9.746,0 14.95,-4.439 14.95,-4.439"
          style={{ fill: "#d2db2d", fillRule: "nonzero" }}
        />
      </svg>
    </SvgIcon>
  );
};

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

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#083163", // Set your desired primary color
    },
    secondary: {
      main: "#395a82", // Set your desired secondary color
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#083163", // Change this color to your desired color
        },
      },
    },
  },
});

export default function Layout({ children, headerText }) {
  const [open, setOpen] = useState(true);
  const [arr, setArr] = useState([]);

  let navigate = useNavigate();

  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [personEl, setPersonEl] = useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePersonClick = (event) => {
    setPersonEl(event.currentTarget);
  };

  const handlePersonClose = () => {
    setPersonEl(null);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/loggedout");
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

  if (!isLoggedIn) return <LoggedOut />;

  const notificationsOpen = Boolean(anchorEl);
  const personOpen = Boolean(personEl);
  const id = notificationsOpen ? "simple-popover" : undefined;
  const pid = personOpen ? "simple-popover" : undefined;

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
            <IconButton color="inherit" onClick={handlePersonClick}>
              <Badge color="secondary">
                <PersonIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={arr.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={pid}
              open={personOpen}
              anchorEl={personEl}
              onClose={handlePersonClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Box
                p={2}
                sx={{
                  textAlign: "center",
                }}
              >
                <div key="person-heading">
                  <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                    Eingeloggt als: {isAdmin ? "Admin" : "Benutzer"}
                  </Typography>
                  <Divider />
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 1 }}
                    onClick={logout}
                  >
                    Ausloggen
                  </Button>
                </div>
              </Box>
            </Popover>

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
            <MySvgIcon />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              backgroundColor: "inherit",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 12 }}>
              Version: 0.1
            </Typography>
          </Box>
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
