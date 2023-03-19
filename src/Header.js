import React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Favorites</MenuItem>
      <MenuItem onClick={handleMenuClose}>My listings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              size="small"
              aria-label="main logo"
              color="inherit"
              href="/list"
            >
              <img src={Logo} alt="logo" width="100px"></img>
            </IconButton>

            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block" } }}
            >
              Geofree
            </Typography> */}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="go to map view"
                color="inherit"
                href="/map"
              >
                <FmdGoodOutlinedIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="go to post item page"
                color="inherit"
                href="/post"
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
