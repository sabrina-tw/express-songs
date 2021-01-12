const express = require("express");
const router = express.Router();
const requireJsonContent = require("../middleware/requireJsonContent");
const ctrl = require("../controllers/songs.controller");

router.post("/", requireJsonContent, async (req, res, next) => {
  const song = await ctrl.createOne(req.body, next);
  res.status(201).json(song);
});

router.get("/", async (req, res, next) => {
  const songs = await ctrl.getAllSongs(next);
  res.status(200).json(songs);
});

router.get("/:id", async (req, res) => {
  const song = await ctrl.findById(req.params.id);
  res.status(200).json(song);
});

router.put("/:id", async (req, res, next) => {
  const song = await ctrl.updateById(req.params.id, req.body, next);
  res.status(200).json(song);
});

router.delete("/:id", async (req, res, next) => {
  const song = await ctrl.deleteById(req.params.id, next);
  res.status(200).json(song);
});

module.exports = router;
