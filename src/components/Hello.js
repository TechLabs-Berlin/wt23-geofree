import React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import Illustration1 from "../images/Charity-amico 1.png";

function Hello({ isFirstTime }) {
  const [open, setOpen] = useState(isFirstTime);

  //Checking if app was open once already

  useEffect(() => {
    const isFirstTime = localStorage.getItem("isFirstTime");
    if (!isFirstTime) {
      localStorage.setItem("isFirstTime", true);
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: "100%", m: 3 }}
        >
          <DialogTitle>Zu verschenken has never been easier</DialogTitle>
          <DialogContent>
            <DialogContentText>Thank you for using our app!</DialogContentText>
          </DialogContent>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            onClick={handleClose}
            sx={{
              m: 1,
              ml: 4,
              mr: 4,
              height: "60px",
            }}
          >
            Explore freebies near you
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            component={RouterLink}
            to="/post"
            sx={{
              m: 1,
              ml: 4,
              mr: 4,
              height: "60px",
            }}
          >
            Share your stuff
          </Button>
          <Box
            component="img"
            sx={{
              maxWidth: 250,
              maXeight: 250,
              ml: 5,
              mr: 5,
              objectFit: "cover",
            }}
            alt="item"
            src={Illustration1}
          ></Box>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Hello;
