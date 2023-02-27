import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/map">Map</Link>
      <Link to="/list">List</Link>
    </div>
  );
};

export default Header;
