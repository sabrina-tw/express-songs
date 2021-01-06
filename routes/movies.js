const express = require("express");
const router = express.Router();

const movies = [];

router.post("/", (req, res) => {
  let newMovie = {
    id: movies.length + 1,
    movieName: req.body.movieName,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

router.get("/", (req, res) => {
  res.status(200).json(movies);
});

router.get("/:id", (req, res) => {
  let movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  res.status(200).json(movie);
});

router.put("/:id", (req, res) => {
  let movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  movie.movieName = req.body.movieName;
  res.status(200).json(movie);
});

router.delete("/:id", (req, res) => {
  let movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  let index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.status(200).json(movie);
});

module.exports = router;
