const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

//middelware
const { cryptPassword } = require("../utils/bcrypt");
const { userInfo } = require("../utils/checkExsisting");

router
  .route("/")
  .get((req, res) => {
    res.json("Signup Placeholder");
  })
  .post(userInfo, cryptPassword, async (req, res) => {
    //Our information from the Signup page
    const {
      lastName,
      firstName,
      email,
      password,
      address,
      phonenumber,
      language,
      skills,
      image,
    } = req.body;
    //Values for the database
    const values = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      address: address,
      phonenumber: phonenumber,
      languages: language,
      skills: skills,
    };

    await pg("Users").insert(values);
    res.status(201).json({ type: "success", message: "Account Created" });
    res.end();
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    if (id)
      return res.send(await pg("Users").where("id", id).del().returning("*"));
    res.send("no id!");
  });

module.exports = router;
