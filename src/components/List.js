import React from "react";
import Item from "./Item";
import Couch from "../images/Couch.jpg";
import Chair from "../images/Chair.jpg";
import Lamp from "../images/Lamp.jpg";

class List extends React.Component {
  render() {
    return (
      <div>
        <Item
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
        />
      </div>
    );
  }
}

export default List;
