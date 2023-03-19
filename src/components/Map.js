import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// Hiding unnecessary labels:

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

// Map component:

function Map() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Getting user geolocation:

  window.navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(parseFloat(position.coords.latitude));
      setLng(parseFloat(position.coords.longitude));
    },
    (err) => console.log(err)
  );

  // Searching through markers:

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !== -1;
    });
    setFilteredData(result);
  };

  // Fetching data:

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
  }, []);

  return (
    <div>
      <div>
        <form>
          <label>
            Search:
            <input
              type="text"
              onChange={(event) => {
                event.preventDefault();
                handleSearch(event);
              }}
            />
          </label>
        </form>
      </div>
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
            <MarkerF clickable={true} position={position} key={value.id} />
          );
        })}
      </GoogleMap>

      {/* <div>
        {filteredData.map((value) => {
          return (
            <div key={value.id}>
              <div>Id:{value.id}</div>
              <div>Title:{value.title}</div>
              <div>Description: {value.description}</div>
              <div>Condition: {value.condition}</div>
              <div>
                <strong>Location</strong>
                <div>Latitude: {value.latitude}</div>
                <div>Longitude: {value.longitude}</div>
              </div>
              <div>
                <img
                  alt="test"
                  width={"250px"}
                  src={
                    `https://geofree.pythonanywhere.com/` +
                    value.images[0].image
                  }
                />
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Map;
