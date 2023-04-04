import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import Taken from "./Taken";
import Available from "./Available";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  CardActionArea,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ItemCard(props) {
  // Navigating to specific item

  const navigate = useNavigate();
  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  // If error

  const onError = (error) => {
    return console.log("Error loading image", error);
  };

  const availability = () => {
    if (props.available === false) {
      return <Taken />;
    }
    return <Available />;
  };
  console.log(props.available);

  const isAvailable = props.available;
  console.log(isAvailable);

  return (
    <Card
      id={props.id}
      sx={{
        maxWidth: 345,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "300px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Like button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            justifyContent: "flex-end",
            top: "10px",
            left: "9px",
            width: "45px",
            zIndex: "999",
          }}
        >
          <LikeButton id={props.id} disabled={!isAvailable} />
        </Box>
      </Box>
      <Slider>
        {props.image.map((image, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              height: "175px",
              width: "100%",
              border: 1,
              borderColor: "border.main",
              objectFit: "cover",
              filter: isAvailable ? "" : "grayscale(100%)",
            }}
            alt="donated items"
            src={`https://geofree.pythonanywhere.com${image.image}`}
            onError={onError}
          />
        ))}
      </Slider>
      <Box position="absolute" top={145} left={1} sx={{}}>
        {availability()}
      </Box>
      <CardActionArea onClick={() => navigateToItem(props.id)}>
        {/* Item information */}

        <CardContent sx={{ pb: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#000000" }}
          >
            {props.title}
          </Typography>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
