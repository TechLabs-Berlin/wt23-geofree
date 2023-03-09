import React, { useState } from "react";
import Location from "./Location";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [condition, setCondition] = useState("");
  const [myImage, setMyImage] = useState(null);

  const submitHandle = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("uploaded_images", myImage, myImage.name);
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("latitude", lat);
    uploadData.append("longitude", lng);
    uploadData.append("condition", condition);
    fetch("http://127.0.0.1:8000/api/item-create/", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form>
        {/* Title form: */}

        <label>
          Title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Description form: */}

        <label>
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* Upload image: */}

        <div>
          <label>
            Select Image:
            {myImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(myImage)}
                />
                <br />
                <button onClick={() => setMyImage(null)}>Remove</button>
              </div>
            )}
            <input
              type="file"
              name="myImage"
              required
              multiple="multiple"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setMyImage(event.target.files[0]);
              }}
            />
          </label>
        </div>

        {/* Condition dropdown: */}

        <label>
          Condition:
          <select
            name="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Choose condition</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="bad">Bad</option>
          </select>
        </label>

        {/* Geolocation: */}

        <Location
          onChange={(e) => setLat(e.target.value) && setLng(e.target.value)}
        />

        <input type="submit" onSubmit={submitHandle} />
      </form>
    </div>
  );
};

export default Post;
