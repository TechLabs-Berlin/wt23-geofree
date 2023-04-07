import React from "react";
import { TextField, Box, Button, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
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
        <Typography variant="h5" sx={{ m: 3, textDecoration: "underline" }}>
          Login
        </Typography>

        <Typography
          variant="h5"
          component={RouterLink}
          to="/register"
          sx={{
            m: 3,
            textDecoration: "none",
            boxShadow: "none",
            color: "#000",
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
        <Typography variant="body" sx={{ m: 3 }}>
          Forgot your password?
        </Typography>
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
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
