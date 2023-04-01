import React from "react";
import { useNavigate } from "react-router-dom";
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
  console.log(props);

  const navigate = useNavigate();
  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const onError = (error) => {
    return console.log("Error loading image", error);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <Slider {...settings}>
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
            }}
            alt="donated items"
            src={`https://geofree.pythonanywhere.com${image.image}`}
            onError={onError}
          />
        ))}
      </Slider>
      <CardActionArea onClick={() => navigateToItem(props.id)}>
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
