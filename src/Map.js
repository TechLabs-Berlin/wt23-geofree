import React from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
// Hiding unnecessary labels. DOESN'T WORK!!! API Key?

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
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
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
        ></GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
