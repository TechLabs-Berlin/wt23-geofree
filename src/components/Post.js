import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  TextField,
  Card,
  Box,
  Stack,
  ButtonGroup,
  Grid,
  Fab,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import Location from "./Location";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [condition, setCondition] = useState("");
  const [myImage, setMyImage] = useState();
  const [category] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const ref = useRef();
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  // Category dropdown:

  const options = [
    "Category",
    "Furniture",
    "Clothes",
    "Kitchen utensils",
    "Kids",
    "Books",
    "Other",
  ];

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    // Loop oveer myImage array
    for (let i = 0; i < myImage.length; i++) {
      uploadData.append(`uploaded_images[${i}]`, myImage[i], myImage.name);
    }

    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("latitude", lat);
    uploadData.append("longitude", lng);
    uploadData.append("condition", condition);
    fetch("https://geofree.pythonanywhere.com/api/item-create/", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    navigate("/");
  };

  const reset = (e) => {
    e.preventDefault();
    ref.current.value = null;
    setMyImage(null);
  };

  return (
    <form onSubmit={submitHandle}>
      {/* Upload image: */}

      <Card
        sx={{
          minHeight: 250,
          border: 1,
          borderColor: "border.main",
          backgroundColor: "text.disabled",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
        }}
      >
        <CardContent>
          <Grid container>
            {myImage ? (
              <div>
                {Array.from(myImage).map((item) => {
                  return (
                    <img
                      key={item.name}
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(item)}
                    />
                  );
                })}

                <Fab component="span" onClick={reset}>
                  <ClearOutlinedIcon />
                </Fab>
              </div>
            ) : null}
            <input
              type="file"
              name="myImage"
              id="uploadimage"
              accept="image/*"
              ref={ref}
              multiple
              hidden
              onChange={(event) => {
                setMyImage(event.target.files);
              }}
            />

            <label htmlFor="uploadimage">
              <Fab component="span">
                <DriveFolderUploadOutlinedIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
      </Card>

      {/* Form: */}

      <Stack
        direction="column"
        spacing={2}
        display="flex"
        // justifyContent="space-between"
        alignItems="center"
      >
        {/* Title form: */}
        <Box>
          <label>
            Name
            <br />
            <TextField
              name="title"
              type="text"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ minWidth: "90vw" }}
            ></TextField>
          </label>
          <br />
        </Box>

        {/* Description form: */}
        <Box>
          <label>
            Description
            <br />
            <TextField
              name="description"
              type="text"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                minWidth: "90vw",
              }}
            ></TextField>
            <br />
          </label>
        </Box>

        {/* Categories: */}
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          sx={{ minWidth: "50vw" }}
          value={category}
        >
          <Button fullWidth onClick={handleClick}>
            {options[selectedIndex]}
          </Button>
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        {/* Condition dropdown: */}
        <Box>
          <label>
            Object condition:
            <br />
            <ButtonGroup
              name="condition"
              value={condition}
              onClick={(e) => setCondition(e.target.value)}
              variant="contained"
              aria-label="outlined primary button group"
              fullWidth
              sx={{ minWidth: "90vw" }}
            >
              <Button value="likenew">Like new</Button>
              <Button value="good">Good</Button>
              <Button value="acceptable">Acceptable</Button>
              <Button value="poor">Poor</Button>
            </ButtonGroup>
          </label>
        </Box>

        <Box sx={{ minWidth: "90vw" }}>
          <Location setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
          <Button variant="contained" type="submit" color="secondary">
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default Post;
