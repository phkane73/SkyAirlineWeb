import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <TextField
        value={query}
        id="filled-basic"
        label="Search..."
        variant="filled"
        size="small"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                variant="outlined"
                onClick={() => {
                  setQuery("");
                }}
                style={{ cursor: "pointer" }}
              ></CloseIcon>
            </InputAdornment>
          ),
        }}
      />
      <IconButton onClick={handleSearch} aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </div>
  );
};

export default Search;
