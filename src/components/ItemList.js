import React from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ItemList({ post }) {
  const navigate = useNavigate();

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        position="absolute"
        spacing={2}
        display="flex"
        elevation="none"
        sx={{
          width: "100%",
          flexGrow: 0,
          borderBottom: 1,
          borderColor: "border.main",
          borderRadius: 0,
          backgroundColor: "background.default",
        }}
      >
        <CardActionArea onClick={() => navigateToItem(post.id)}>
          <Grid direction="row" container wrap="nowrap" sx={{ m: 1 }}>
            <Grid item sx={{ m: 1 }}>
              <Box
                component="img"
                sx={{
                  width: 120,
                  height: 120,
                  border: 1,
                  borderColor: "border.main",
                  objectFit: "cover",
                  borderRadius: 0.3,
                }}
                alt="item"
                src={
                  `https://geofree.pythonanywhere.com/` + post.images[0].image
                }
              ></Box>
            </Grid>

            <Box sx={{ maxwidth: "40%", display: "block" }}>
              <Grid item sx={{ m: 2, pr: 2 }}>
                <div key={post.id}>
                  <Typography>
                    <strong>{post.title}</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      wordBreak: "break-word",
                      display: "inline-block",
                    }}
                  >
                    {post.description}
                  </Typography>
                  <br />
                  <br />
                  <div>
                    <strong>Location</strong>
                  </div>
                </div>
              </Grid>
            </Box>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default ItemList;
