import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Grid, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  // const [distance, setDistance] = useState(1000);
  // const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !== -1;
    });
    setFilteredData(result);
  };

  const navigateToItem = () => {
    navigate("/item");
  };

  // const routeChange = () => {
  //   let path = `https://geofree.pythonanywhere.com/api/item-detail/${key.id}`;
  //   navigate(path);
  // };

  // useEffect(() => {
  //   fetch(
  //     `https://geofree.pythonanywhere.com/api/item-list-distance/?distance=${distance}&lat=${lat}&lng=${lng}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data);
  //     })
  //     .catch((e) => {
  //       console.log("ERROR", e.json());
  //     });
  // });

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
      {/* Search bar: */}
      <Box>
        <TextField
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          variant="standard"
          onChange={(event) => {
            event.preventDefault();
            handleSearch(event);
          }}
          sx={{ borderBottom: 1, borderColor: "border.main" }}
        />
      </Box>

      {/* <Search /> */}

      <div>
        {filteredData.map((value) => {
          return (
            <Box
              display="flex"
              justifyContent="center"
              sx={{
                m: 0,
                flexGrow: 1,
                borderBottom: 1,
                borderColor: "border.main",
              }}
            >
              <Grid container spacing={1} sx={{ m: 1 }}>
                <Grid item xs={6}>
                  <Box
                    component="img"
                    sx={{
                      width: 200,
                      height: 200,
                      border: 1,
                      borderColor: "border.main",
                      objectFit: "cover",
                      borderRadius: 0.3,
                    }}
                    alt="item"
                    src={
                      `https://geofree.pythonanywhere.com/` +
                      value.images[0].image
                    }
                  ></Box>
                </Grid>

                <Grid item xs={6}>
                  <div key={value.id}>
                    <div>Id:{value.id}</div>
                    <div>
                      <strong>{value.title}</strong>
                    </div>
                    <div>{value.description}</div>
                    <div>Condition: {value.condition}</div>
                    <div>
                      <strong>Location</strong>

                      {/* <div>Latitude: {value.latitude}</div>
                      <div>Longitude: {value.longitude}</div> */}
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    onClick={navigateToItem}
                    // key={value.id}
                    // title={value.title}
                    // description={value.description}
                    // condition={value.condition}
                  >
                    Go to item
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
