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
      condition: "",
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
    const condition = target.value;

    this.setState({
      [name]: value,
      [lat]: value,
      [lng]: value,
      [condition]: value,
    });
  }

  submitHandle() {
    const uploadData = new FormData();
    uploadData.append("uploaded_images", this.myImage, this.myImage.name);
    uploadData.append("title", this.title);
    uploadData.append("description", this.description);
    uploadData.append("latitude", this.lat);
    uploadData.append("longitude", this.lng);
    uploadData.append("condition", this.condition);
    fetch("http://127.0.0.1:8000/api/item-create/", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
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
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>

          <UploadImage />
          <label>
            Condition:
            <select
              name="condition"
              value={this.state.condition}
              onChange={this.handleChange}
            >
              <option value="">Choose condition</option>
              <option value="good">Good</option>
              <option value="okay">Okay</option>
              <option value="bad">Bad</option>
            </select>
          </label>
          <Location />
          <input type="submit" onClick={this.submitHandle} />
        </form>
      </div>
    );
  }
}

export default Post;
