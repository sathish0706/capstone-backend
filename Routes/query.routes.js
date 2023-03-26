const express = require("express");
const {
  postQuery,
  getQuery,
  getQueryById,
  deleteQueryById,
} = require("../Controllers/query.controllers");

const router = express.Router();

router.post("/post/query", postQuery);

router.get("/get/query", getQuery);

router.get("/get/query/:id", getQueryById);

router.delete("/delete/query/:id", deleteQueryById);

module.exports = router;
