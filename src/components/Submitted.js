import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SubmitTick from "../images/SubmitTick.png";

const Submitted = () => {
  return (
    <Paper
      position="absolute"
      direction="column"
      spacing={2}
      display="flex"
      justifyContent="center"
      elevation="none"
      sx={{
        borderRadius: 0,
        backgroundColor: "background.default",
        width: "100%",
      }}
    >
      <Box
        component="img"
        display="block"
        sx={{
          width: 120,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          objectFit: "cover",
          m: 3,
          marginTop: "100px",
          margin: "0 auto",
        }}
        alt="success"
        src={SubmitTick}
      ></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          m: 3,
        }}
      >
        <Typography variant="h4" sx={{ m: 3 }}>
          Submitted!
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          p: 3,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          disableElevation
          component={RouterLink}
          to="/"
          sx={{
            minWidth: "40vw",
            ml: 3,
            mr: 0.5,

            fontSize: 14,
            textTransform: "lowercase",
          }}
        >
          Homepage
        </Button>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          component={RouterLink}
          to={`/`}
          sx={{
            minWidth: "40vw",
            mr: 3,
            ml: 0.5,
            //
            border: "1px solid ",
            borderColor: "green",
            fontSize: 14,
            textTransform: "lowercase",
          }}
        >
          View your item
        </Button>
      </Box>
    </Paper>
  );
};

export default Submitted;
