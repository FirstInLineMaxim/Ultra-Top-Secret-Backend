const express = require("express");
const router = express.Router();
const { comparePassword } = require("../utils/bcrypt");
const { loginUserInfo } = require("../utils/checkUser");
const jwt = require("jsonwebtoken");
const pg = require("../utils/db");

function signJWT(user) {
  return jwt.sign({ userId: user }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}

async function getUserData(user) {
  return await pg("Users").select("*").where("id", user);
}

router
  .route("/")
  .get((req, res) => {
    res.json("Login Placeholder");
  })
  .post(loginUserInfo, comparePassword, async (req, res) => {
    console.log("Login");
    //gets the valid from the checkpassword
    const { valid, user } = req.body;
    //Return JWT token on success
    if (valid) {
      try {
        // Create JWT
        const token = signJWT(user);
        // Query database for user data
        const userdata = await getUserData(user);
        // Return success response to client
        return res.json({
          type: "success",
          message: "Logged In",
          token: token,
          user: userdata,
        });
      } catch (error) {
        // Handle error
        console.error(error);
        return res.json({
          type: "error",
          message: "An error occurred while logging in.",
        });
      }
    }
    res.json({ type: "error", message: "Wrong Password!" });
  });

module.exports = router;
