import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import Hello from "./Hello";
import ItemList from "./ItemList";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);

  // Getting categories from BurgerMenu

  useEffect(() => {
    setCategoriesSelected(location.state?.categoriesSelected || "");
  }, [location.state?.categoriesSelected]);

  // Fetching all items

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/item-list/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllData(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, []);

  // Fetching data of selected categories

  useEffect(() => {
    fetch(
      `https://geofree.pythonanywhere.com/api/item-categories-list/?categories=${categoriesSelected}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllData(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, [categoriesSelected]);

  const handleFilter = (data) => {
    setFilteredData(data);
  };

  return (
    <div>
      <Search
        onSearch={handleFilter}
        categoriesSelected={categoriesSelected}
        setCategoriesSelected={setCategoriesSelected}
      />
      <Hello />
      <div>
        {filteredData.length > 0
          ? filteredData.map((post) => {
              return <ItemList post={post} />;
            })
          : allData.map((post) => {
              return <ItemList post={post} />;
            })}
      </div>
    </div>
  );
};

export default Home;
