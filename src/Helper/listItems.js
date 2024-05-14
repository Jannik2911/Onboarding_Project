import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useNavigate } from "react-router-dom";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";

export default function MainListItems() {
  let navigate = useNavigate();

  const open = (path) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ChecklistOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Aufgaben" onClick={() => open("/tasks")} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Mitarbeiterverwaltung"
          onClick={() => open("/mitarbeiterverwaltung")}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BadgeOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary="Mitarbeiterverzeichnis"
          onClick={() => open("/mitarbeiterverzeichnis")}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BadgeOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary="Terminmanager"
          onClick={() => open("/terminmanager")}
        />
      </ListItemButton>
    </React.Fragment>
  );
}
