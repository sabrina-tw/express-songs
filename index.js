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

// MIDDLEWARE
app.use((req, res, next) => {
  console.log("common middleware function was called!");
  next();
});

const checkColor = () => {
  console.log("in checkColor");
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
app.post("/songs", requireJsonContent, (req, res, next) => {
  res.send("thanks for the json!");
});

app.get("/songs", (req, res) => {
  res.status(200).json(songs);
});

app.listen(PORT, () => {
  console.log(`express app started on port ${PORT}`);
});
