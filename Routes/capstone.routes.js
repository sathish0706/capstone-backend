const express = require("express");

const {
  postCapstone,
  getCapstone,
} = require("../Controllers/capstone.controllers");

const router = express.Router();

router.post("/post/capstone", postCapstone);

router.get("/get/capstone", getCapstone);

module.exports = router;
