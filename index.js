const express = require("express");
const axios = require("axios");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/teams/:conf", (request, response) => {
  axios
    .get(
      "https://api.collegefootballdata.com/teams?conference=" +
        request.params.conf,
      {
        headers: {
          Authorization:
            "Bearer PUUUNtoqkV/PmNnH+wOGkUArUVgMeOotMaSey6d3XD93LfGTdjOOACNPX7Yvt/Cf",
        },
      }
    )
    .then((res) => {
      let teams = res.data;
      response.json(teams);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/api/conferences", (request, response) => {
  axios
    .get("https://api.collegefootballdata.com/conferences", {
      headers: {
        Authorization:
          "Bearer PUUUNtoqkV/PmNnH+wOGkUArUVgMeOotMaSey6d3XD93LfGTdjOOACNPX7Yvt/Cf",
      },
    })
    .then((res) => {
      let teams = res.data;
      let fbsteams = teams.filter((team) => team.classification === "fbs");
      response.json(fbsteams.slice(0, 10));
    })
    .catch((error) => {
      console.error(error);
    });
});

const PORT = 3001;
app.listen(PORT);
console.log("server running on port " + PORT);
