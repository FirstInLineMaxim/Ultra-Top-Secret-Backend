const express = require("express");
const router = express.Router();
const pg = require("../database/db");

router
  .route("/")
  .get((req, res) => {
    res.json("Home Placeholder");
  })
  .post(async (req, res) => {
    res.json(await pg.select("*").from("Users"));
  });

module.exports = router;
