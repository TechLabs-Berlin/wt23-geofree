import React from "react";
import { Link as RouterLink } from "react-router-dom";
import BurgerMenu from "./components/BurgerMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Logo from "./images/Logo_L.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ p: 2 }}
    >
      <MenuItem onClick={handleMenuClose} component={RouterLink} to="/login">
        <AccountCircleOutlinedIcon sx={{ m: 1 }} />
        Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        component={RouterLink}
        to="/favorites"
      >
        <FavoriteBorderIcon sx={{ m: 1 }} />
        Favorites
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={RouterLink} to="/listings">
        <FormatListBulletedIcon sx={{ m: 1 }} />
        My listings
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={RouterLink} to="/login">
        <SettingsOutlinedIcon sx={{ m: 1 }} />
        Settings
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box
        sx={{ m: 0, flexGrow: 1, borderBottom: 1, borderColor: "border.main" }}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <BurgerMenu />

            <IconButton
              size="small"
              aria-label="main logo"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              <img src={Logo} alt="logo" width="100px"></img>
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="go to map view"
                color="inherit"
                component={RouterLink}
                to="/map"
              >
                <FmdGoodOutlinedIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="go to post item page"
                color="inherit"
                component={RouterLink}
                to="/post"
              >
                <FileUploadOutlinedIcon />
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </div>
  );
};

export default Header;
