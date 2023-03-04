import { React, useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <input type="search" placeholder="Search here" />
    </div>
  );
};
export default Search;
