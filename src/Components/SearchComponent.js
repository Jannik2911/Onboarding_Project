import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Mitarbeiter-Schnellsuche</h2>
      <TextField
        id="search"
        type="search"
        label="Suche"
        alignItems="center"
        value={searchTerm}
        onChange={handleChange}
        sx={({ width: 600 }, { textAlign: "center" })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List
        sx={
          ({ width: "100%", maxWidth: 360, bgcolor: "background.paper" },
          { textAlign: "center" })
        }
      >
        {arr.map((value) => (
          <ListItem
            key={value}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${value}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchComponent;
