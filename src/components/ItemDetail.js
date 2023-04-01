import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchButton from "./SearchButton";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://geofree.pythonanywhere.com/api/item-detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onError = (error) => {
    return console.log("Error loading image", error);
  };

  return (
    <div>
      <SearchButton />
      <Slider {...settings}>
        {item.images.map((image, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              maxHeight: 400,
              height: "100%",
              border: 1,
              borderColor: "border.main",
              objectFit: "contain",
              display: "block",
            }}
            alt="donated items"
            src={`https://geofree.pythonanywhere.com${image.image}`}
            onError={onError}
          />
        ))}
      </Slider>

      <Box sx={{ p: 5 }} width="100%">
        <div key={item.id}>
          <Typography variant="h5">{item.title}</Typography>

          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body1">Condition: {item.condition}</Typography>
          <Typography variant="body1">Category: {item.categories}</Typography>
          <Typography variant="body1">Location</Typography>
        </div>
      </Box>
    </div>
  );
};

export default ItemDetail;
