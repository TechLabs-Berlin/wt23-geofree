import React from "react";
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

class Map extends React.Component {
  state = { lat: 0, lng: 0, errorMessage: "" };

  componentDidMount() {
    // Getting user geolocation:
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        }),
      (err) => console.log(err)
    );
  }

  render() {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        styles={myStyles}
        center={this.state}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: myStyles,
        }}
      >
        <MarkerF clickable={true} position={this.state} draggable={true} />
      </GoogleMap>
    );
  }
}

export default Map;
