const express = require("express");
const app = express();
const PORT = 3002;

const songs = [
  {
    name: "Song 1",
    artist: "Artist 1",
  },
  {
    name: "Song 2",
    artist: "Artist 2",
  },
];

// const songs = [];

app.get("/songs", (req, res) => {
  res.status(200).json(songs);
});

app.listen(PORT, () => {
  console.log(`express app started on port ${PORT}`);
});
