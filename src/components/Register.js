import React from "react";
import { TextField, Box, Button, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
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
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",

          m: 3,
        }}
      >
        <Typography
          variant="h5"
          component={RouterLink}
          to="/login"
          sx={{ m: 3, textDecoration: "none", color: "#000" }}
        >
          Login
        </Typography>

        <Typography
          variant="h5"
          sx={{
            m: 3,

            boxShadow: "none",

            textDecoration: "underline",
          }}
        >
          Register
        </Typography>
      </Box>

      <Box
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <TextField
          name="name"
          type="text"
          label="Name"
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          sx={{
            width: "100%",
            mb: 3,
            backgroundColor: "info.main",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              "& fieldset": {
                borderColor: "border.main",
                borderRadius: 30,
              },

              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
          }}
        ></TextField>
        <TextField
          name="title"
          type="email"
          label="E-Mail"
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          sx={{
            width: "100%",
            mb: 3,
            backgroundColor: "info.main",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              "& fieldset": {
                borderColor: "border.main",
                borderRadius: 30,
              },

              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
          }}
        ></TextField>
        <TextField
          name="title"
          type="password"
          label="Password"
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            width: "100%",
            mb: 3,
            backgroundColor: "info.main",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              "& fieldset": {
                borderColor: "border.main",
                borderRadius: 30,
              },

              "&.Mui-focused fieldset": {
                borderColor: "green",
                borderRadius: 30,
              },
            },
          }}
        ></TextField>

        <Button
          variant="contained"
          type="submit"
          color="secondary"
          sx={{
            minWidth: "100%",
            mt: 3,
            height: "60px",
          }}
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
};

export default Register;
