const express = require("express");
const app = express();
app.use(express.json());

// MIDDLEWARE
app.use((req, res, next) => {
  // console.log("common middleware function was called!");
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

// ROUTES

const songsRouter = require("./routes/songs");
app.use("/songs", songsRouter);

const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

module.exports = app;
