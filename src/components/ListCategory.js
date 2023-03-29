import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

function ListCategory() {
  const [categoriesSelected, setCategoriesSelected] = useState([]); // state() that stores the categories selected by the user to do the query
  const [categories, setCategories] = useState([]); //state() that stores the choices of categories available in the backend
  const [posts, setPosts] = useState([]); //state() that stores the backend response with the requested data
  //fetch the GeoFree categories
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

  //category query submission by passing the array of categories selected by user
  const submitSearch = (event) => {
    event.preventDefault();
    fetch(
      `http://127.0.0.1:8000/api/item-categories-list/?categories=${categoriesSelected}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((e) => {
        console.log("ERROR", e.json());
      });
  };

  const myStyle = {
    border: "1px solid black",
    padding: "10px",
    listStyle: "none",
    width: "fit-content",
  };

  return (
    <div>
      {/* Multiselect component displays the categories availables to filter items */}
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
        <br></br>
        <br></br>
        <button onClick={submitSearch}>Search</button>
      </label>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <ul>
          {posts?.map((post) => {
            return (
              <div key={post.id} style={myStyle}>
                <li>{post.id}</li>
                <li>{post.title}</li>
                <li>{post.description}</li>
                {post.categories.map((x) => {
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
                        src={`http://127.0.0.1:8000` + x.image}
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

export default ListCategory;
