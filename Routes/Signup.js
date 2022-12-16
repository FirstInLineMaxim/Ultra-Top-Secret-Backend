const express = require("express");
const router = express.Router();
const pg = require("../database/db");

router
  .route("/")
  .get((req, res) => {
    res.json("Signup Placeholder");
  })
  .post(async (req, res) => {
    const { lastName, firstName, email, password } = req.body;
    const values = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
    };

    res.json(await pg("Users").insert(values).returning("*"));
    res.end();
  });

module.exports = router;
