const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../Controllers/userAuth.controllers");

const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);

route.get("/logout", logout);

route.post("/forgotPassword", forgotPassword);

route.post("/resetPassword", resetPassword);

module.exports = route;
