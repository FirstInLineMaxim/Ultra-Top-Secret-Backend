const express = require("express");
const router = express.Router();
const pg = require("../database/db");

router
  .route("/")
  .get(async (req, res) => {
    res.json(await pg("Users").select("*"));
  })
  .post(async (req, res) => {});

module.exports = router;
