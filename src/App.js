import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Map from "./components/Map";
import Home from "./components/Home";

import ItemDetail from "./components/ItemDetail";
import Post from "./components/Post";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFEF9",
    },
    background: {
      default: "#FFFEF9", //background
    },
    border: {
      main: "#5C9E28", //input radius
    },
    secondary: {
      main: "#B8E173", //green buttons
    },
    info: {
      main: "#F3F0DC",
    },
    input: {
      default: "#F3F0DC",
    },
    text: {
      disabled: "#EFEFF0",
    },
  },
  shape: {
    borderRadius: 30,
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
