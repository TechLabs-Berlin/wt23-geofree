import React, { useState, useRef } from "react";
import Location from "./Location";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [condition, setCondition] = useState("");
  const [myImage, setMyImage] = useState();
  const ref = useRef();

  const submitHandle = () => {
    const uploadData = new FormData();

    // Loop oveer myImage array
    for (let i = 0; i < myImage.length; i++) {
      uploadData.append(`uploaded_images[${i}]`, myImage[0], myImage.name);
    }

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

  const reset = (e) => {
    e.preventDefault();
    ref.current.value = null;
    setMyImage(null);
  };

  return (
    <div>
      <form onSubmit={() => submitHandle()}>
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
            {myImage ? (
              <div>
                {Array.from(myImage).map((item) => {
                  return (
                    <img
                      key={item.name}
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(item)}
                    />
                  );
                })}

                <button onClick={reset}>Remove</button>
              </div>
            ) : null}
            <input
              type="file"
              name="myImage"
              accept="image/*"
              ref={ref}
              multiple
              onChange={(event) => {
                setMyImage(event.target.files);
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

        <Location setLat={setLat} setLng={setLng} lat={lat} lng={lng} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Post;
