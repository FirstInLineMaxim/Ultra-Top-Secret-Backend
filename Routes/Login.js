const express = require("express");
const router = express.Router();
const { comparePassword } = require("../utils/bcrypt");
const { retriveUserInfo } = require("../utils/checkUser");
const jwt = require("jsonwebtoken");
router
  .route("/")
  .get((req, res) => {
    res.json("Login Post Placeholder");
  })
  .post(retriveUserInfo, comparePassword, (req, res) => {
    //gets the valid from the checkpassword
    const { valid, id } = req.body;
    //Return JWT token on success
    if (valid) {
      const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
      return res.json({ message: "Logged in", token: token });
    }
    res.json({message: "Wrong Password!"});
  });

module.exports = router;
