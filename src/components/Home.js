import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import Hello from "./Hello";
import { Box, Grid, Card } from "@mui/material";
import { CardActionArea } from "@mui/material";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const navigate = useNavigate();
  console.log(categoriesSelected);
  const location = useLocation();
  const [distance, setDistance] = useState(1000);

  // Getting categories from BurgerMenu

  useEffect(() => {
    setCategoriesSelected(location.state?.categoriesSelected || "");
  }, [location.state?.categoriesSelected]);

  // Fetching all items

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

  // Fetching data of selected categories

  useEffect(() => {
    fetch(
      `https://geofree.pythonanywhere.com/api/item-categories-list/?categories=${categoriesSelected}`
    )
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
  }, [categoriesSelected]);

  console.log(categoriesSelected);

  // Navigating to specific item

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleSearch = (categoriesSelected, distance, lat, lng) => {
    setCategoriesSelected(categoriesSelected);
    setDistance(distance, lat, lng);
  };

  console.log(categoriesSelected);

  return (
    <div>
      <Search
        onSearch={handleSearch}
        categoriesSelected={categoriesSelected}
        setCategoriesSelected={setCategoriesSelected}
      />
      <Hello />
      <div>
        {allData.map((post) => {
          return (
            <div>
              <Card
                display="flex"
                justify="center"
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
    </div>
  );
};

export default Home;
