// import React, { useState, useEffect } from "react";

// function Search() {
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState(allData);

//   const handleSearch = (event) => {
//     let value = event.target.value.toLowerCase();
//     let result = [];
//     console.log(value);
//     result = allData.filter((data) => {
//       return data.title.search(value) !== -1;
//     });
//     setFilteredData(result);
//   };

//   return (
//     <div>
//       <form>
//         <label>
//           Search:
//           <input
//             type="text"
//             onChange={(event) => {
//               event.preventDefault();
//               handleSearch(event);
//             }}
//           />
//         </label>
//       </form>
//     </div>
//   );
// }

// export default Search;
