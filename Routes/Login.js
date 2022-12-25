const express = require("express");
const router = express.Router();
const { comparePassword } = require("../utils/bcrypt");
const { loginUserInfo } = require("../utils/checkUser");
const jwt = require("jsonwebtoken");
router
  .route("/")
  .get((req, res) => {
    res.json("Login Post Placeholder");
  })
  .post(loginUserInfo, comparePassword, (req, res) => {
    console.log("Login");
    //gets the valid from the checkpassword
    const { valid, user } = req.body;
    //Return JWT token on success
    if (valid) {
      const token = jwt.sign({ userId: user }, process.env.JWT_SECRET, {
        expiresIn: "1800s",
      });
      return res.json({ message: "Logged In", token: token });
    }
    res.json({ message: "Wrong Password!" });
  });

module.exports = router;
