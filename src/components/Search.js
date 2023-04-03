import React, { useState, useEffect } from "react";
import Location from "./Location";
import {
  Box,
  Card,
  Select,
  MenuItem,
  FormControl,
  Button,
  Collapse,
  CardActionArea,
} from "@mui/material";

import Multiselect from "multiselect-react-dropdown";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ onSearch, categoriesSelected, setCategoriesSelected }) => {
  const [categories, setCategories] = useState([]); //state() that stores the choices of categories available in the backend
  const [setPosts] = useState([]); //state() that stores the backend response with the requested data
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [distance, setDistance] = useState(1000);
  const [open, setOpen] = useState(false);

  //Fetching categories for Multiselect component

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

  // async function submitSearch(event) {
  //   event.preventDefault();
  //   try {
  //     const response1 = await fetch(
  //       `https://geofree.pythonanywhere.com/api/item-categories-list/?categories=${categoriesSelected}`
  //     );
  //     const response2 = await fetch(
  //       `https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`
  //     );
  //     const data1 = await response1.json();
  //     const data2 = await response2.json();
  //     const filteredPosts = data1.filter((post1) => {
  //       return data2.some((post2) => post1.id === post2.id);
  //     });
  //     setPosts(filteredPosts);
  //     onFilter(filteredPosts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleCategoryChange = (selected) => {
    setCategoriesSelected(selected.join(","));
  };

  async function submitSearch(event) {
    event.preventDefault();

    fetch(
      `https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        onSearch(data);
      })
      .catch((e) => {
        console.log("ERROR", e.json());
      });
  }

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Search bar */}
      <Card
        display="flex"
        justify="center"
        sx={{ borderBottom: 1, borderColor: "border.main", borderRadius: 0 }}
      >
        <CardActionArea>
          <Box
            sx={{
              height: 40,
              backgroundColor: "background.default",
            }}
            onClick={handleCollapse}
          >
            <SearchIcon fontSize="large" sx={{ ml: 2, mt: 0.4 }} />
          </Box>
        </CardActionArea>
      </Card>

      <Collapse in={open}>
        <Card
          sx={{
            borderColor: "border.main",
            borderRadius: 0,
            backgroundColor: "background.default",
          }}
        >
          <div>
            <Box display="flex" justifyContent="center" sx={{ mt: 10 }}>
              <FormControl onSubmit={submitSearch}>
                {/* Multiselect display */}

                <Multiselect
                  avoidHighlightFirstOption={true}
                  isObject={false}
                  options={option}
                  onSelect={handleCategoryChange}
                  onRemove={handleCategoryChange}
                  placeholder="What do you need?"
                  id="css_custom"
                  style={{
                    multiselectContainer: {
                      border: "1px solid #5C9E28",
                      borderRadius: "30px",
                      backgroundColor: "#F3F0DC",
                      width: "90vw",
                      height: "60px",
                      padding: "0.7em",
                    },
                    chips: { background: "#5C9E28" },
                    searchBox: {
                      border: "none",
                    },
                    optionContainer: {
                      border: "1px solid #5C9E28",
                      borderRadius: "15px",
                    },
                    selectedOption: {
                      background: "#5C9E28",
                    },
                  }}
                />

                <Location setLat={setLat} setLng={setLng} lat={lat} lng={lng} />

                {/* Range dropdown */}

                <Select
                  id="range"
                  name="distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  sx={{
                    border: "1px solid #5C9E28",
                    backgroundColor: "#F3F0DC",
                  }}
                >
                  <MenuItem value={1000}>1 km</MenuItem>
                  <MenuItem value={2000}>2 km</MenuItem>
                  <MenuItem value={3000}>3 km</MenuItem>
                  <MenuItem value={5000}>5 km</MenuItem>
                  <MenuItem value={10000}>10 km</MenuItem>
                  <MenuItem value={20000}>20 km</MenuItem>
                </Select>

                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{
                    m: 10,
                    height: "60px",
                  }}
                >
                  Search
                </Button>
              </FormControl>
            </Box>
          </div>
        </Card>
      </Collapse>
    </div>
  );
};

export default Search;
