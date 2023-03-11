import React from "react";
// import Item from "./Item";
import Search from "./Search";

class List extends React.Component {
  state = { items: [] };

  componentDidMount() {
    const loadSearchResults = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/item-list/");
        const data = await res.json();
      } catch (e) {
        console.log("ERROR", e);
      }
    };
    loadSearchResults();
  }

  render() {
    return (
      <div>
        <Search />
        <div>
          <ul>
            <div></div>
          </ul>
        </div>
        {/* <Item
          id="1"
          image={Couch}
          title="sofa"
          description="green velvet sofa"
          location="my backyard"
          state="very good"
        />

        <Item
          id="2"
          image={Chair}
          title="chair"
          description="black chair"
          location="Berlin"
          state="good"
        />
        <Item
          id="3"
          image={Lamp}
          title="lamp"
          description="white pendant lamp"
          location="Berlin"
          state="ok"
        /> */}
      </div>
    );
  }
}

export default List;
