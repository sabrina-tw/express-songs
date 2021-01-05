const express = require("express");
const app = express();
const PORT = 3002;
app.use(express.json());

const songs = [
  {
    id: 1,
    name: "Song 1",
    artist: "Artist 1",
  },
  {
    id: 2,
    name: "Song 2",
    artist: "Artist 2",
  },
];

// const songs = [];

// MIDDLEWARE
app.use((req, res, next) => {
  console.log("common middleware function was called!");
  next();
});

const checkColor = () => {
  return (req, res, next) => {
    if (req.query.color) {
      res.send("I have color");
    } else {
      next();
    }
  };
};

app.use(checkColor());

const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};

// ROUTES
app.post("/songs", requireJsonContent, (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

app.get("/songs", (req, res) => {
  res.status(200).json(songs);
});

app.param("id", (req, res, next, id) => {
  let song = songs.find((song) => song.id === parseInt(id));
  req.song = song;
  next();
});

app.get("/songs/:id", (req, res) => {
  res.status(200).json(req.song);
});

app.put("/songs/:id", (req, res) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;
  res.status(200).json(req.song);
});

app.delete("/songs/:id", (req, res) => {
  let index = songs.indexOf(req.song);
  songs.splice(index, 1);
  res.status(200).json(req.song);
});

app.listen(PORT, () => {
  console.log(`express app started on port ${PORT}`);
});
