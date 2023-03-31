import React, { useState, useEffect } from "react";
import Location from "./Location";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@mui/material";

function Search() {
  const [categoriesSelected, setCategoriesSelected] = useState([]); // state() that stores the categories selected by the user to do the query
  const [categories, setCategories] = useState([]); //state() that stores the choices of categories available in the backend
  const [posts, setPosts] = useState([]); //state() that stores the backend response with the requested data
  //fetch the GeoFree categories
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [distance, setDistance] = useState(1000);

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/get-categories/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, []);

  //building the categories array to show in Multiselect component
  const option = [];
  for (let i = 0; i < categories.length; i++) {
    option.push(categories[i].name);
  }

  async function submitSearch(event) {
    event.preventDefault();
    try {
      const response1 = await fetch(
        `https://geofree.pythonanywhere.com/api/item-categories-list/?categories=${categoriesSelected}`
      );
      const response2 = await fetch(
        `https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`
      );
      const data1 = await response1.json();
      const data2 = await response2.json();
      console.log(data1);
      console.log(data2);
      setPosts(data1);
      setPosts(data2);
    } catch (error) {
      console.error(error);
    }
  }

  const myStyle = {
    border: "1px solid black",
    padding: "10px",
    listStyle: "none",
    width: "fit-content",
  };

  return (
    <div>
      {/* Multiselect component displays the categories availables to filter items */}
      <form onSubmit={submitSearch}>
        <label>
          Filter by Categories
          <Multiselect
            avoidHighlightFirstOption={true}
            isObject={false}
            options={option}
            onRemove={(event) => {
              setCategoriesSelected(event);
            }}
            onSelect={(event) => {
              setCategoriesSelected(event);
            }}
            onChange={(event) => {
              setCategoriesSelected(event);
            }}
          />
          <Location setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
          <br />
          <br />
          <label htmlFor="range">Choose a range (kms):</label>
          <select
            id="range"
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
            name="distance"
          >
            <option value={1000}>1 km</option>
            <option value={2000}>2 kms</option>
            <option value={3000}>3 kms</option>
            <option value={4000}>4 kms</option>
            <option value={5000}>5 kms</option>
            <option value={20000}>20 kms</option>
          </select>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            onClick={submitSearch}
          >
            Search
          </Button>
        </label>
      </form>

      <div>
        <ul>
          {posts?.map((post) => {
            return (
              <div key={post.id} style={myStyle}>
                <li>{post.id}</li>
                <li>{post.title}</li>
                <li>{post.description}</li>
                {post.categories?.map((x) => {
                  return (
                    <ul>
                      <li>{x}</li>
                    </ul>
                  );
                })}
                {post.images.map((x) => {
                  return (
                    <div key={x.id}>
                      <img
                        alt="test"
                        width={"250px"}
                        src={`https://geofree.pythonanywhere.com/` + x.image}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Search;
