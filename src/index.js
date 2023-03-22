import React from "react";
import ReactDOM from "react-dom/client";
import { LoadScript } from "@react-google-maps/api";
import App from "./App";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <App style={{ backgroundColor: "#FFFEF9" }} />
    </LoadScript>
  </React.StrictMode>
);
