import React from "react";
import { Box, Typography } from "@mui/material";

const Available = () => {
  return (
    <Box
      display="flex"
      justify="center"
      sx={{ backgroundColor: "secondary.main", width: "60px" }}
    >
      <Typography variant="caption">Available</Typography>
    </Box>
  );
};

export default Available;
