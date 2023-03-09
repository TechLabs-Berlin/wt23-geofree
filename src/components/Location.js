import React from "react";

class Location extends React.Component {
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
      <p>
        <strong>Latitude:</strong>
        {this.state.lat || "(Loading...)"}
        <strong>Longitude:</strong>
        {this.state.lng || "(Loading...)"}
        <input type="hidden" name="lat" value={this.state.lat} />
        <input type="hidden" name="lng" value={this.state.lng} />
      </p>
    );
  }
}

export default Location;
