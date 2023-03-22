import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://geofree.pythonanywhere.com/api/item-detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing={1} sx={{ m: 1 }}>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{
              width: 200,
              height: 200,
              border: 1,
              borderColor: "border.main",
              objectFit: "cover",
              borderRadius: 0.3,
            }}
            alt="item"
            src={`https://geofree.pythonanywhere.com/` + item.images[0].image}
          ></Box>
        </Grid>

        <Grid item xs={6}>
          <div key={item.id}>
            <div>Id:{item.id}</div>
            <div>
              <strong>{item.title}</strong>
            </div>
            <div>{item.description}</div>
            <div>Condition: {item.condition}</div>
            <div>
              <strong>Location</strong>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemDetail;
