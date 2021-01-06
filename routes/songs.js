const express = require("express");
const router = express.Router();
const requireJsonContent = require("../middleware/requireJsonContent");
const Joi = require("@hapi/joi");
const e = require("express");

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

const validateSong = (song) => {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(1).required(),
    artist: Joi.string().min(1).required(),
  });

  return schema.validate(song);
};

router.post("/", requireJsonContent, (req, res, next) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };

  const validation = validateSong(newSong);

  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  } else {
    songs.push(newSong);
    res.status(201).json(newSong);
  }
});

router.get("/", (req, res) => {
  res.status(200).json(songs);
});

router.param("id", (req, res, next, id) => {
  let song = songs.find((song) => song.id === parseInt(id));
  req.song = song;
  next();
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.song);
});

router.put("/:id", (req, res, next) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;

  const validation = validateSong(req.song);

  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  } else {
    res.status(200).json(req.song);
  }
});

router.delete("/:id", (req, res) => {
  let index = songs.indexOf(req.song);
  songs.splice(index, 1);
  res.status(200).json(req.song);
});

module.exports = router;
