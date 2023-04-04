import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import Hello from "./Hello";
import ItemList from "./ItemList";

import { Box, Typography, Grid, CardActionArea } from "@mui/material";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [mlItems, setMlItems] = useState([]);
  const navigate = useNavigate();

  // Getting categories from BurgerMenu

  useEffect(() => {
    setCategoriesSelected(location.state?.categoriesSelected || "");
  }, [location.state?.categoriesSelected]);

  // Fetching all items

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/item-list/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
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

  const handleFilter = (data) => {
    setFilteredData(data);
  };

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div>
      <Search
        onSearch={handleFilter}
        categoriesSelected={categoriesSelected}
        setCategoriesSelected={setCategoriesSelected}
        setMlItems={setMlItems}
        mlItems={mlItems}
      />
      <Hello />
      <div>
        {filteredData.length > 0
          ? filteredData.map((post) => {
              return <ItemList post={post} />;
            })
          : allData.map((post) => {
              return <ItemList post={post} />;
            })}
      </div>
      <div>
        {mlItems.length > 0 ? (
          <Box sx={{ pt: 5 }}>
            <Typography sx={{ pl: 2 }} variant="body1">
              <strong>You might also like:</strong>
            </Typography>
            <Grid
              container
              flexDirection="row"
              spacing={1}
              sx={{ justifyContent: "center", alignItems: "center", pt: 2 }}
            >
              {mlItems.map((x) => {
                return (
                  <Grid item xs={4}>
                    <CardActionArea onClick={() => navigateToItem(x.id)}>
                      <Box
                        width="100%"
                        sx={{
                          m: 0,
                          backgroundColor: "#F3F0DC",
                          display: "flex",
                          justifyContent: "center",
                          p: 2,
                          height: "200px",
                        }}
                      >
                        <div key={x.id}>
                          <Box
                            component="img"
                            sx={{
                              width: 120,
                              height: 120,
                              border: 1,
                              borderColor: "border.main",
                              objectFit: "cover",
                              borderRadius: 0.3,
                              display: "flex",
                              flexDirection: "column",
                            }}
                            alt="item"
                            src={
                              `https://geofree.pythonanywhere.com/` +
                              x.images[0].image
                            }
                          ></Box>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "center" }}
                          >
                            {x.title}
                          </Typography>
                        </div>
                      </Box>
                    </CardActionArea>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
