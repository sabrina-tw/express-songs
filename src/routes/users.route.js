const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
