import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useNavigate } from "react-router-dom";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AdminContext } from "../Components/AdminContext";
import { useContext } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
//import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export default function MainListItems() {
  let navigate = useNavigate();

  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const open = (path) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon onClick={() => open("/dashboard")} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={() => open("/dashboard")} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ChecklistOutlinedIcon onClick={() => open("/tasks")} />
        </ListItemIcon>
        <ListItemText primary="Aufgaben" onClick={() => open("/tasks")} />
      </ListItemButton>

      {isAdmin && (
        <ListItemButton>
          <ListItemIcon>
            <BadgeOutlinedIcon onClick={() => open("/employeelist")} />
          </ListItemIcon>
          <ListItemText
            primary="Kontaktbuch"
            onClick={() => open("/employeelist")}
          />
        </ListItemButton>
      )}
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon onClick={() => open("/terminmanager")} />
        </ListItemIcon>
        <ListItemText
          primary="Terminmanager"
          onClick={() => open("/terminmanager")}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon onClick={() => open("/ablaufplan")} />
        </ListItemIcon>
        <ListItemText
          primary="Ablaufplan"
          onClick={() => open("/ablaufplan")}
        />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <InfoIcon onClick={() => open("/info")} />
        </ListItemIcon>
        <ListItemText primary="Informationen" onClick={() => open("/info")} />
      </ListItemButton>
      <Divider />
      {isAdmin && (
        <ListItemButton>
          <ListItemIcon>
            <EditIcon onClick={() => open("/ablaufplanerstellen")} />
          </ListItemIcon>
          <ListItemText
            primary="Ablaufplan erstellen"
            onClick={() => open("/ablaufplanerstellen")}
          />
        </ListItemButton>
      )}
      {isAdmin && (
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon onClick={() => open("/mitarbeiterverwaltung")} />
          </ListItemIcon>
          <ListItemText
            primary="Mitarbeiterverwaltung"
            onClick={() => open("/mitarbeiterverwaltung")}
          />
        </ListItemButton>
      )}
    </React.Fragment>
  );
}
