import React from "react";
import UploadImage from "./UploadImage";
import Location from "./Location";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      lat: null,
      lng: null,
      //   condition: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const lat = target.value;
    const lng = target.value;
    // const condition = target.value;

    this.setState({
      [name]: value,
      [lat]: value,
      [lng]: value,
      //   [condition]: value,
    });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Title:
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>

          <UploadImage />
          <Location />
          {/* <label>
            Condition:
            <input
              name="condition"
              type="radio"
              value={this.state.condition}
              onChange={this.handleChange}
            />
          </label> */}
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Post;
