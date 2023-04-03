import React, { useState } from 'react'
import Location from "./Location";
​
function ListDistance() {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [distance, setDistance] = useState(1000);
    const [posts, setPosts] = useState([])
​
   
​
      const submitSearch = (event) => {
        event.preventDefault(); // prevent the default form submission
      
        fetch(`https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`)
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
          })
          .catch((e) => {
            console.log("ERROR", e.json());
          });
      };
      
      const myStyle = {
        border: '1px solid black',
        padding: '10px',
        listStyle: 'none',
        width: 'fit-content'
      };
​
  return (
    <div>
        <Location setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
        <form onSubmit={submitSearch}>
            <br />
            <br />
            <label htmlFor="range">Choose a range (kms):</label>
            <select id="range" onChange={(e) => setDistance(e.target.value)} value={distance} name="distance">
                <option value={1000}>1 km</option>
                <option value={2000}>2 kms</option>
                <option value={3000}>3 kms</option>
                <option value={4000}>4 kms</option>
                <option value={5000}>5 kms</option>
                <option value={20000}>20 kms</option>
            </select>
            <br></br>
            <br></br>
            <input type='submit' />
        </form>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
        <ul>
            {posts?.map((post) => {
            return (
                <div key={post.id} style={myStyle}>
                <li >{post.title}</li>
                <li>{post.description}</li>
                <img
                    alt='test'
                    width={"250px"}
                    src={`https://geofree.pythonanywhere.com/` + post.images[0].image}
                />
                </div>
            )
            })}
        </ul>
        </div>
    </div>
  )
}
​
export default ListDistance