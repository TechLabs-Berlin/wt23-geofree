import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchButton from "./SearchButton";
import { Box, Grid, Card } from "@mui/material";
import { CardActionArea } from "@mui/material";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const navigate = useNavigate();
  console.log(categoriesSelected);
  const location = useLocation();

  useEffect(() => {
    setCategoriesSelected(location.state?.categoriesSelected || "furniture");
  }, [location.state?.categoriesSelected]);

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

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div>
      <SearchButton />
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
