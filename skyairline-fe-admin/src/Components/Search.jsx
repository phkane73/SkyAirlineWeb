import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
const Search = ({ onSearch, text }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleChange = (event) => {
    if (!event.target.value) {
      onSearch(undefined);
    }
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center mb-2 w-[350px]">
      <TextField
        value={query}
        id="filled-basic"
        label={text}
        variant="filled"
        size="small"
        fullWidth
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                variant="outlined"
                onClick={() => {
                  setQuery("");
                  return onSearch("");
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
