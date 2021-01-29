const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

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

const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);

// DEFAULT ERROR HANDLER

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
