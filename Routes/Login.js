const express = require("express");
const router = express.Router();
const { comparePassword } = require("../utils/bcrypt");
const { loginUserInfo } = require("../utils/checkUser");
const jwt = require("jsonwebtoken");
const pg = require("../utils/db");
router
  .route("/")
  .get((req, res) => {
    res.json("Login Post Placeholder");
  })
  .post(loginUserInfo, comparePassword, async (req, res) => {
    console.log("Login");
    //gets the valid from the checkpassword
    const { valid, user } = req.body;
    //Return JWT token on success
    if (valid) {
      const token = jwt.sign({ userId: user }, process.env.JWT_SECRET, {});
      const userdata = await pg("Users").select("*").where("id", user);
      console.log(userdata);
      return res.json({ type: "success", message: "Logged In", token: token ,user:userdata});
    }
    res.json({ type: "error", message: "Wrong Password!" });
  });

module.exports = router;
