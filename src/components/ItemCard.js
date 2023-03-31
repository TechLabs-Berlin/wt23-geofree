import React from "react";
import { useNavigate } from "react-router-dom";
import Shoes from "../images/shoes.jpeg";

import {
  CardActionArea,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ItemCard(props) {
  console.log(props);

  const navigate = useNavigate();
  const navigateToItem = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <Card
      id={props.id}
      sx={{
        maxWidth: 345,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "300px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <CardActionArea onClick={() => navigateToItem(props.id)}>
        <Box
          key={props.id}
          component="img"
          sx={{
            maxHeight: "100%",
            height: 200,
            width: "100%",
            border: 1,
            borderColor: "border.main",
            objectFit: "cover",
          }}
          src={Shoes}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#000000" }}
          >
            {props.title}
          </Typography>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
