// SearchBar.js
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = debounce(() => {
    if (searchTerm.trim()) {
      navigate(`/list-products?search=${encodeURIComponent(searchTerm)}`);
    }
  }, 300);

  const handleSearch = () => {
    debouncedSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label="Tìm kiếm sản phẩm..."
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root": {
            borderRadius: 100,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Fragment>
  );
};

export default SearchBar;
