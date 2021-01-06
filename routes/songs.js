const express = require("express");
const router = express.Router();
const requireJsonContent = require("../middleware/requireJsonContent");

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

router.post("/", requireJsonContent, (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs.push(newSong);
  res.status(201).json(newSong);
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

router.put("/:id", (req, res) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;
  res.status(200).json(req.song);
});

router.delete("/:id", (req, res) => {
  let index = songs.indexOf(req.song);
  songs.splice(index, 1);
  res.status(200).json(req.song);
});

module.exports = router;
