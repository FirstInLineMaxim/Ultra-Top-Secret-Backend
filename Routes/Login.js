const express = require("express");
const router = express.Router();
const { comparePassword } = require("../utils/bcrypt");
const { retriveUserInfo } = require("../utils/checkUser");
router
  .route("/")
  .get(retriveUserInfo, comparePassword, (req, res) => {
    //gets the valid from the checkpassword
    const { valid } = req.body;
    if (valid) return res.send("Logged in");
    res.send("Wrong Password!");
  })
  .post((req, res) => {
    res.json("Login Post Placeholder");
  });

module.exports = router;
