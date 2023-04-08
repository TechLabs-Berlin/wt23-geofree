import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line
  const [categoriesSelected, setCategoriesSelected] = React.useState(null);
  const navigate = useNavigate();

  //Clicking menu button

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closing menu button

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Clicking catogories

  const handleMenuItemClick = (categoriesSelected) => {
    setCategoriesSelected(categoriesSelected);
    handleClose();
    navigate("/", { state: { categoriesSelected: categoriesSelected } });
    console.log(categoriesSelected);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        size="large"
        id="burger-menu"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        variant="contained"
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="burger-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("")}>All</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("furniture")}>
          Furniture
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("clothes")}>
          Clothes
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("kitchen")}>
          Kitchen
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("kidstoys")}>
          Kids toys
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("plants")}>
          Plants
        </MenuItem>
      </Menu>
    </div>
  );
}
