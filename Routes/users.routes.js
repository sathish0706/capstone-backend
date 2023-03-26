const express = require("express");
const { getUser } = require("../Controllers/users.controllers");
// const { isAuth } = require("../utils/auth");
// const { isAdmin } = require("../utils/athorised");

const router = express.Router();

router.get("/user", getUser);

module.exports = router;
