import React, { useEffect } from "react";

const Item = ({ key, title, description }) => {
  useEffect(() => {
    fetch(`https://geofree.pythonanywhere.com/api/item-detail/${key}`)
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

  return <div>Item</div>;
};

export default Item;
