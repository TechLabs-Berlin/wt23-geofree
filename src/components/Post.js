import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Location from "./Location";
import {
  CardContent,
  TextField,
  Card,
  Box,
  Paper,
  Grid,
  Fab,
  Button,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Multiselect from "multiselect-react-dropdown";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [condition, setCondition] = useState("");
  const [myImage, setMyImage] = useState();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // state() that stores the categories selected by the user to do the query
  const [categoriesSelected, setCategoriesSelected] = useState([]); //state() that stores the choices of
  const ref = useRef();
  const [addCategory, setAddCategory] = useState(false); //state() that will conditionally display the input of a new category
  const [newCategory, setNewCategory] = useState(); // state() that stores the new category created by the user
  const [locationLoaded, setLocationLoaded] = useState(false);

  //fetch the GeoFree categories

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/get-categories/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, []);

  //building the categories array to show in Multiselect component

  const option = [];
  for (let i = 0; i < categories.length; i++) {
    option.push(categories[i].name);
  }

  const submitHandle = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    // Loop over myImage array
    for (let i = 0; i < myImage.length; i++) {
      uploadData.append(`uploaded_images[${i}]`, myImage[i], myImage.name);
    }

    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("latitude", lat);
    uploadData.append("longitude", lng);
    uploadData.append("condition", condition);
    uploadData.append("categories", categoriesSelected); //Array of categories added to the item
    fetch("https://geofree.pythonanywhere.com/api/item-create/", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    navigate("/submitted");
  };

  useEffect(() => {
    if (lat && lng) {
      setLocationLoaded(true);
    }
  }, [lat, lng]);

  //If user adds a new category, it will be added to the category DB

  const addCategoryHandle = (event) => {
    event.preventDefault();
    if (option.includes(newCategory)) {
      setNewCategory("Category already exists");
    } else {
      categoriesSelected.push(newCategory);
      fetch("http://127.0.0.1:8000/api/category-create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategory,
        }),
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setAddCategory(false);
      setNewCategory(null);
    }
  };

  //Remove selected image

  const reset = (e) => {
    e.preventDefault();
    ref.current.value = null;
    setMyImage(null);
  };

  return (
    <div>
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

        <Paper
          position="absolute"
          direction="column"
          spacing={2}
          display="flex"
          justifyContent="center"
          elevation="none"
          sx={{
            borderRadius: 0,
            backgroundColor: "background.default",
            width: "100%",
          }}
        >
          {/* Title form: */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            <label style={{ fontSize: "23px" }}>
              Name
              <br />
              <TextField
                name="title"
                type="text"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  width: "90vw",
                  mb: 1,
                  backgroundColor: "info.main",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "40px",
                    "& fieldset": {
                      borderColor: "border.main",
                      borderRadius: 30,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "green",
                    },
                  },
                }}
              ></TextField>
            </label>
            <br />
          </Box>

          {/* Description form: */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <label style={{ fontSize: "23px" }}>
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
                  width: "90vw",
                  mb: 1,
                  backgroundColor: "info.main",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "40px",
                    "& fieldset": {
                      borderColor: "border.main",
                      borderRadius: 30,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "green",
                    },
                  },
                }}
              ></TextField>
              <br />
            </label>
          </Box>

          {/* Category dropdown */}
          <Box
            sx={{
              m: 3,
            }}
          >
            <label style={{ fontSize: "23px" }}>Category</label>
          </Box>
          <Box
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            <Multiselect
              avoidHighlightFirstOption={true}
              isObject={false}
              options={option}
              onRemove={(event) => {
                setCategoriesSelected(event);
              }}
              onSelect={(event) => {
                setCategoriesSelected(event);
              }}
              onChange={(event) => {
                setCategoriesSelected(event);
              }}
              style={{
                multiselectContainer: {
                  border: "1px solid #5C9E28",
                  borderRadius: "30px",
                  backgroundColor: "#F3F0DC",
                  width: "90vw",
                  height: "60px",
                  padding: "0.7em",
                },
                inputField: {
                  fontSize: "17px",
                },
                chips: { background: "#5C9E28" },
                searchBox: {
                  border: "none",
                },
                optionContainer: {
                  border: "1px solid border.main",
                  borderRadius: "15px",
                },
                selectedOption: {
                  background: "#5C9E28",
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setAddCategory(true)}
              sx={{ mt: 2 }}
            >
              Add Category
            </Button>
            {addCategory ? (
              <Box flexDirection="column">
                <TextField
                  label="Add category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  sx={{
                    mb: 2,
                    mt: 2,
                    backgroundColor: "info.main",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "40px",
                      "& fieldset": {
                        borderColor: "border.main",
                        borderRadius: 30,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "green",
                      },
                    },
                  }}
                ></TextField>
                <br />

                <Button
                  onClick={addCategoryHandle}
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{ ml: 1 }}
                  onClick={() => setAddCategory(false)}
                >
                  Close
                </Button>
              </Box>
            ) : null}
          </Box>

          {/* Condition button: */}
          <Box
            sx={{
              display: "start",
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            <label style={{ fontSize: "23px" }}>Object condition:</label>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            <ButtonGroup
              name="condition"
              value={condition}
              onClick={(e) => setCondition(e.target.value)}
              variant="contained"
              aria-label="item condition selection"
              fullWidth
              sx={{
                width: "90vw",
                height: "50px",
                boxShadow: "0px 0px 0px 1px #5C9E28",
                mb: 3,
                backgroundColor: "info.main",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  "& fieldset": {
                    borderColor: "border.main",
                    borderRadius: 30,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "green",
                  },
                },
              }}
            >
              <Button
                sx={{
                  fontSize: 14,
                  textTransform: "lowercase",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                  backgroundColor:
                    condition === "like new" ? "secondary.main" : "",
                }}
                value="like new"
              >
                Like new
              </Button>
              <Button
                sx={{
                  fontSize: 14,
                  textTransform: "lowercase",
                  backgroundColor: condition === "good" ? "secondary.main" : "",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
                value="good"
              >
                Good
              </Button>
              <Button
                sx={{
                  fontSize: 14,
                  textTransform: "lowercase",

                  backgroundColor:
                    condition === "acceptable" ? "secondary.main" : "",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
                value="acceptable"
              >
                Acceptable
              </Button>
              <Button
                sx={{
                  fontSize: 14,
                  textTransform: "lowercase",

                  backgroundColor: condition === "poor" ? "secondary.main" : "",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
                value="poor"
              >
                Poor
              </Button>
            </ButtonGroup>
          </Box>

          {/* Location */}

          <Box
            sx={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Location
              setLat={setLat}
              setLng={setLng}
              lat={lat}
              lng={lng}
              hidden
            />
            {locationLoaded ? (
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                sx={{
                  height: "60px",
                  minWidth: "100%",
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                color="secondary"
                sx={{
                  height: "60px",
                  minWidth: "100%",
                }}
              >
                Location loading
              </Button>
            )}
          </Box>
        </Paper>
      </form>
    </div>
  );
};

export default Post;
