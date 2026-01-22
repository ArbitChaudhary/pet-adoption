import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import type React from "react";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SearchBox = ({ searchQuery, setSearchQuery }: SearchBoxProps) => {
  const [search, setSearch] = useState<string>(searchQuery);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(search);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleReset = () => {
    setSearchQuery("");
    setSearch("");
  };
  return (
    <form onSubmit={handleSearch}>
      <TextField
        size="small"
        label="Search"
        name="search"
        value={search}
        onChange={handleOnChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery ? (
                  <IconButton size="medium" edge="end" onClick={handleReset}>
                    <CloseIcon fontSize="medium" />
                  </IconButton>
                ) : (
                  <IconButton type="submit" size="medium" edge="end">
                    <SearchIcon fontSize="medium" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );
};

export default SearchBox;
