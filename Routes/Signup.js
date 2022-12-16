const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

//middelware
const { cryptPassword } = require("../utils/bcrypt");

router
  .route("/")
  .get((req, res) => {
    res.json("Signup Placeholder");
  })
  .post(cryptPassword, async (req, res) => {
    const {
      lastName,
      firstName,
      email,
      password,
      address,
      phonenumber,
      languages,
      skills,
      image,
    } = req.body;
    //cryptPassword takes 1 argument a string and returns a hash
    const values = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      address: address,
      phonenumber: phonenumber,
      languages: languages,
      skills: skills,
    };

    res.json(await pg("Users").insert(values).returning("*"));
    res.end();
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    if (id)
      return res.send(await pg("Users").where("id", id).del().returning("*"));
    res.send("no id!");
  });

module.exports = router;
