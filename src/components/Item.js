import React from "react";

const Item = ({ id, image, title, description, location, state }) => {
  return (
    <div>
      <div>Item Card</div>

      <div>
        <figure>
          <img src={image} style={{ width: "20%" }} alt=""></img>
        </figure>
      </div>

      <div>
        <p>ID: {id}</p>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Location: {location}</p>
        <p>State: {state}</p>
      </div>
    </div>
  );
};

export default Item;
