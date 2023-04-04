import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeButton = (id) => {
  const [like, setLike] = useState(0);
  const handleLikeClick = () => {
    fetch(`https://geofree.pythonanywhere.com/api/like-item/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: like + 1 }), // Update like count
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLike(data.like); // Update state with new like count from server
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  };

  return (
    <IconButton onClick={handleLikeClick}>
      <FavoriteBorderIcon sx={{ fontSize: "xl", justifyContent: "center" }} />
    </IconButton>
  );
};

export default LikeButton;
