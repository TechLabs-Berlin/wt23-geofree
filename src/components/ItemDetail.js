import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Location from "./Location";
import Taken from "./Taken";
import Available from "./Available";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Button } from "@mui/material";
import LikeButton from "./LikeButton";
// import ItemList from "./ItemList";

const ItemDetail = () => {
  const { id } = useParams();
  // const { categoryId } = useParams();
  const [item, setItem] = useState(null);
  const [distance, setDistance] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // const [chosenCategory, setChosenCategory] = useState(null);

  const navigate = useNavigate();

  // Fetching item with specific id

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

  useEffect(() => {
    if (lat && lng) {
      fetch(
        `https://geofree.pythonanywhere.com/api/item-user-distance-id/?user_latitude=${lat}&user_longitude=${lng}&item_id=${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDistance(data.distance_kms);
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    }
  }, [id, lat, lng]);

  // useEffect(() => {
  //   fetch(
  //     `https://geofree.pythonanywhere.com/api/ml-ranking/?chosen_category=${categoryId}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setChosenCategory(data);
  //       console.log("recommended", data);
  //     })
  //     .catch((e) => {
  //       console.log("ERROR", e);
  //     });
  // }, [categoryId]);

  const handleMarkAsTaken = () => {
    fetch(`https://geofree.pythonanywhere.com/api/item-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        available: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };

  // If unavailable

  if (!item) {
    return <div>Loading...</div>;
  }

  // Display arrows

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block",
          color: "#FFFFFF",
          zIndex: 999,
          left: "20px",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block",
          color: "#000000",
          zIndex: 999,
          right: "20px",
        }}
        onClick={onClick}
      ></div>
    );
  };

  // Slider settings

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // If error

  const onError = (error) => {
    return console.log("Error loading image", error);
  };

  // Navigating to map

  const navigateToItem = () => {
    navigate(`/map/`);
    console.log(id);
  };

  const availability = () => {
    if (item.available === false) {
      return <Taken />;
    }
    return <Available />;
  };

  const isAvailable = item.available;

  return (
    <div>
      <div>
        {/* Like button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",

              justifyContent: "flex-end",
              top: "-1px",
              width: "45px",
              zIndex: "999",
            }}
          >
            <LikeButton id={id} disabled={!isAvailable} />
          </Box>
        </Box>
        {/* Image slider */}
        <Box>
          <Slider
            {...settings}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
          >
            {item.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                sx={{
                  height: 400,
                  filter: isAvailable ? "" : "grayscale(100%)",
                  border: 1,
                  borderColor: "border.main",
                  objectFit: "cover",
                  display: "block",
                }}
                alt="donated items"
                src={`https://geofree.pythonanywhere.com${image.image}`}
                onError={onError}
              />
            ))}
          </Slider>
          <Box position="absolute" top={65} left={0} sx={{}}>
            {availability()}
          </Box>
        </Box>

        {/* Item information */}

        <Box sx={{ p: 5, flexDirection: "column" }} width="100%">
          <div key={item.id}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {item.description}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Condition:</strong> {item.condition}
            </Typography>
            <Typography variant="body1">
              Posted {Array.from(item.item_age)[0]} days ago
            </Typography>

            {distance ? (
              <Typography variant="body1">
                <strong>Distance:</strong>
                {distance.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                km
              </Typography>
            ) : (
              <Typography variant="body1">Loading distance...</Typography>
            )}
            <Location
              hidden
              setLat={setLat}
              setLng={setLng}
              lat={lat}
              lng={lng}
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={handleMarkAsTaken}
              sx={{
                m: 1,
                height: "40px",
                width: "45%",
              }}
            >
              Mark as taken
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={navigateToItem}
              // component={RouterLink}
              // to="/map"
              sx={{
                m: 1,
                height: "40px",
                width: "45%",
              }}
            >
              Show on map
            </Button>
          </div>
        </Box>
      </div>
      {/* Recommendations */}

      {/* <ItemList post={categoryId} /> */}
      {/* 
      <div>
        <Typography>You might also like:</Typography>
        <Box sx={{ p: 5, flexDirection: "column" }} width="100%">
          <div key={chosenCategory.categoryId}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {chosenCategory.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {chosenCategory.description}
            </Typography>
          </div>
        </Box>
      </div> */}
    </div>
  );
};

export default ItemDetail;
