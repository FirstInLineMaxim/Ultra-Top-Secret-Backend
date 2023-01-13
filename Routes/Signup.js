const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

// Middleware
const { cryptPassword } = require("../utils/bcrypt");
const { signUpUserInfo } = require("../utils/validateSignup");

async function insertIntoDatabase(values) {
  try {
    await pg("Users").insert(values);
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while inserting into the database.");
  }
}

router
  .route("/")
  .get((req, res) => {
    res.json("Signup Placeholder");
  })
  .post(signUpUserInfo, cryptPassword, async (req, res) => {
    // Our information from the Signup page
    const {
      lastname,
      firstname,
      email,
      password,
      address,
      phonenumber,
      language,
      skills,
      image,
    } = req.body;
    // Values for the database
    const values = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      password: password,
      address: address,
      phonenumber: phonenumber,
      languages: language,
      skills: skills,
    };

    try {
      await insertIntoDatabase(values);
      res.status(201).json({ type: "success", message: "Account Created" });
      res.end();
    } catch (error) {
      res.status(500).json({ type: "error", message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    if (id)
      return res.send(await pg("Users").where("id", id).del().returning("*"));
    res.send("no id!");
  });

module.exports = router;
