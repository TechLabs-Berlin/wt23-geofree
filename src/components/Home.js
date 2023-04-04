import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import Hello from "./Hello";
import ItemList from "./ItemList";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [mlItems, setMlItems] = useState([])
 
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
        setMlItems={setMlItems}
        mlItems={mlItems} 
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
      <div>
            {mlItems.length > 0 ? (
                <div>
                  <Typography>You might also like:</Typography>
                  {mlItems.map((x) => {
                    return (
                      <Box sx={{ p: 5, flexDirection: "column" }} width="100%">
                      <div key={x.id}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                          {x.title}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          Description
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {x.description}
                        </Typography>
                      </div>
                    </Box>
                    )
                  })}
                </div>
              ) : (null)}
      </div>
    </div>
  );
};

export default Home;
