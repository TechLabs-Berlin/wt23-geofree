import React from "react";
import { Box, Typography } from "@mui/material";

const Taken = () => {
  return (
    <Box
      display="flex"
      justify="center"
      sx={{ backgroundColor: "#989997", width: "60px" }}
    >
      <Typography variant="caption" sx={{ color: "white" }}>
        Taken
      </Typography>
    </Box>
  );
};

export default Taken;
