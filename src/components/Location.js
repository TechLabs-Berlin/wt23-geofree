import React from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
    };
  }

  componentDidMount() {
    // Getting user geolocation:

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.setLng(parseFloat(position.coords.longitude));
        this.props.setLat(parseFloat(position.coords.latitude));
      },
      (err) => console.log(err)
    );
  }
  if(hidden) {
    return null;
  }

  render() {
    const { hidden } = this.props;
    if (hidden) {
      return null;
    }

    return (
      <p>
        <strong>Latitude:</strong>
        {this.props.lat || "(Loading...)"}
        <strong>Longitude:</strong>
        {this.props.lng || "(Loading...)"}
        <input type="hidden" name="lat" value={this.props.lat} />
        <input type="hidden" name="lng" value={this.props.lng} />
      </p>
    );
  }
}

export default Location;
