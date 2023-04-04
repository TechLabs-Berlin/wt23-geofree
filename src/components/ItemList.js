import React from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import Available from "./Available";
import Taken from "./Taken";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function ItemList({ post }) {
  const navigate = useNavigate();

  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const availability = () => {
    if (post.available === false) {
      return <Taken />;
    }
    return <Available />;
  };

  const isAvailable = post.available;

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
        <Grid
          direction="row"
          position="relative"
          container
          wrap="nowrap"
          sx={{ m: 0 }}
        >
          <Grid item sx={{ m: 1 }}>
            <Box position="absolute" top={6} left={90}>
              <LikeButton disabled={!isAvailable} />
            </Box>
            <Box
              component="img"
              sx={{
                width: 120,
                height: 120,
                border: 1,
                borderColor: "border.main",
                objectFit: "cover",
                borderRadius: 0.3,
                filter: isAvailable ? "" : "grayscale(100%)",
              }}
              alt="item"
              src={`https://geofree.pythonanywhere.com/` + post.images[0].image}
            ></Box>
            <Box position="absolute" top={15} left={9} sx={{}}>
              {availability()}
            </Box>
          </Grid>
          <CardActionArea
            disabled={!isAvailable}
            onClick={() => navigateToItem(post.id)}
          >
            <Box sx={{ maxwidth: "40%", display: "block" }}>
              <Grid item sx={{ mt: 1 }}>
                <div key={post.id}>
                  <Typography variant="body1">
                    <strong>{post.title}</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: "break-word",
                      display: "inline-block",
                    }}
                  >
                    {post.description}
                  </Typography>

                  <div>{/* <strong>Location: {post.latitude}</strong> */}</div>
                </div>
              </Grid>

              <FmdGoodOutlinedIcon sx={{ mt: 3 }} />
            </Box>

            <Box>
              <Grid item sx={{ mt: 1, mr: 1 }}>
                <Typography variant="caption">
                  {Array.from(post.item_age)[0]} days ago
                </Typography>
              </Grid>
            </Box>
          </CardActionArea>
        </Grid>
      </Card>
    </Box>
  );
}

export default ItemList;
