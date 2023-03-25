import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
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

  return (
    <div>
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
            alt=""
            src={`https://geofree.pythonanywhere.com${image.image}`}
            onError={(e) => console.log("Error loading image", e)}
          />
        ))}
      </Slider>

      <Box>
        <div key={item.id}>
          <div>Id:{item.id}</div>
          <div>
            <strong>{item.title}</strong>
          </div>
          <div>{item.description}</div>
          <div>Condition: {item.condition}</div>
          <div>
            <strong>Location</strong>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ItemDetail;
