import { Fragment, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const handleSearchProductChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchProduct = () => {
    if (searchValue.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(searchValue)}`);
    } else {
      navigate(`/all-products`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchProduct();
    }
  };

  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label="Tìm kiếm sản phẩm..."
        size="small"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchProductChange}
        onKeyDown={handleKeyDown}
        sx={{
          width: {
            lg: 500,
            xl: 500,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearchProduct}>
                  <Search />
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
