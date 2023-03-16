import React, { useState, useEffect } from "react";

function List() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) != -1;
    });
    setFilteredData(result);
  };

  useEffect(() => {
    fetch("https://geofree.pythonanywhere.com/api/item-list/")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllData(data);
        setFilteredData(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
      });
  }, []);

  return (
    <div>
      <div>
        <form>
          <label>
            Search:
            <input
              type="text"
              onChange={(event) => {
                event.preventDefault();
                handleSearch(event);
              }}
            />
          </label>
        </form>
      </div>
      <div>
        {filteredData.map((value) => {
          return (
            <div key={value.id}>
              <div>Id:{value.id}</div>
              <div>Title:{value.title}</div>
              <div>Description: {value.description}</div>
              <div>Condition: {value.condition}</div>
              <div>
                <strong>Location</strong>
                <div>Latitude: {value.latitude}</div>
                <div>Longitude: {value.longitude}</div>
              </div>
              <div>
                <img
                  alt="test"
                  width={"250px"}
                  src={
                    `https://geofree.pythonanywhere.com/` +
                    value.images[0].image
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default List;
