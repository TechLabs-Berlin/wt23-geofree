import React from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

// Initial map position:

// const center = { lat: 52.520008, lng: 13.404954 };

// Map size:

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Turning off unnecessary labels:

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
  constructor(props) {
    super(props);

    this.state = { lat: null, lng: null };

    // Getting user geolocation:

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        });
      },
      (err) => console.log(err)
    );
  }

  render() {
    // Loading and displaying Google Maps API:

    return (
      <LoadScript googleMapsApiKey="AIzaSyCo8xQ2sDMy3KMcyC8KL3tT7pSXj5ydV5k">
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMap
            center={this.state}
            zoom={15}
            mapContainerStyle={containerStyle}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: myStyles,
            }}
          ></GoogleMap>
        </div>
      </LoadScript>
    );
  }
}

export default Map;
