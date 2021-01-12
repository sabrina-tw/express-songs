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

const songsRouter = require("./routes/songs.route");
app.use("/songs", songsRouter);

const moviesRouter = require("./routes/movies.route");
app.use("/movies", moviesRouter);

// DEFAULT ERROR HANDLER

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
