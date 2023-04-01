import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { CardActionArea } from "@mui/material";

import Location from "./Location";
import Multiselect from "multiselect-react-dropdown";

const Search = () => {
  // eslint-disable-next-line
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [categoriesSelected, setCategoriesSelected] = useState([]); // state() that stores the categories selected by the user to do the query
  const [categories, setCategories] = useState([]); //state() that stores the choices of categories available in the backend
  const [posts, setPosts] = useState([]); //state() that stores the backend response with the requested data
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [distance, setDistance] = useState(1000);

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

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/item-list/")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllData(data);
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

  async function submitSearch(event) {
    event.preventDefault();
    try {
      const response1 = await fetch(
        `https://geofree.pythonanywhere.com/api/item-categories-list/?categories=${categoriesSelected}`
      );
      const response2 = await fetch(
        `https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`
      );
      const data1 = await response1.json();
      const data2 = await response2.json();
      const filteredPosts = data1.filter((post1) => {
        return data2.some((post2) => post1.id === post2.id);
      });
      setPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div>
      <div>
        <Box display="flex" justifyContent="center" sx={{ mt: 10 }}>
          <FormControl onSubmit={submitSearch}>
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

            <Select
              id="range"
              name="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              sx={{ border: "1px solid #5C9E28", backgroundColor: "#F3F0DC" }}
            >
              <MenuItem value={1000}>1 km</MenuItem>
              <MenuItem value={2000}>2 km</MenuItem>
              <MenuItem value={3000}>3 km</MenuItem>
              <MenuItem value={5000}>5 km</MenuItem>
              <MenuItem value={10000}>10 km</MenuItem>
            </Select>

            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={submitSearch}
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

      {posts.map((post) => {
        return (
          <div>
            <Card
              display="flex"
              justifyContent="center"
              sx={{
                m: 0,
                flexGrow: 1,
                borderBottom: 1,
                borderColor: "border.main",
                borderRadius: 0,
                backgroundColor: "background.default",
              }}
            >
              <CardActionArea onClick={() => navigateToItem(post.id)}>
                <Grid container spacing={1} sx={{ m: 1 }}>
                  <Grid item xs={6}>
                    <Box
                      component="img"
                      sx={{
                        width: 200,
                        height: 200,
                        border: 1,
                        borderColor: "border.main",
                        objectFit: "cover",
                        borderRadius: 0.3,
                      }}
                      alt="item"
                      src={
                        `https://geofree.pythonanywhere.com/` +
                        post.images[0].image
                      }
                    ></Box>
                  </Grid>

                  <Grid item xs={6}>
                    <div key={post.id}>
                      <div>
                        <strong>{post.title}</strong>
                      </div>
                      <div>{post.description}</div>
                      <div>Condition: {post.condition}</div>
                      <div>Category: {post.categories}</div>
                      <div>
                        <strong>Location</strong>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
