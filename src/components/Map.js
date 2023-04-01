import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import ItemCard from "./ItemCard";
import SearchButton from "./SearchButton";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

function Map() {
  const { id } = useParams();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);

  window.navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(parseFloat(position.coords.latitude));
      setLng(parseFloat(position.coords.longitude));
    },
    (err) => console.log(err)
  );

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/item-list/")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllData(data);
        setFilteredData(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, [id]);

  const handleMarkerClick = (item) => {
    console.log(item);
    setItem(item);
  };

  useEffect(() => {
    setIsOpen(item !== null);
  }, [item]);

  return (
    <div>
      <SearchButton />
      <GoogleMap
        mapContainerStyle={containerStyle}
        styles={myStyles}
        center={{ lat, lng }}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: myStyles,
        }}
      >
        {filteredData.map((value) => {
          const position = { lat: value.latitude, lng: value.longitude };

          return (
            <MarkerF
              clickable={true}
              position={position}
              key={value.id}
              onClick={() => handleMarkerClick(value)}
            />
          );
        })}
        {item && (
          <Box sx={{ position: "fixed", left: "50%", top: "50%" }}>
            <ItemCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.images}
              id={item.id}
              onClose={() => {
                setIsOpen(false);
                setItem(null);
              }}
            ></ItemCard>
            <IconButton
              variant="contained"
              sx={{
                zIndex: 999,
                position: "absolute",
                left: "122px",
                top: "-140px",
                color: "primary.main",
              }}
              onClick={() => {
                setIsOpen(false);
                setItem(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
