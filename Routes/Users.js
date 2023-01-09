const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  //Returns all user
  .get(async (req, res) => {
    res.json(await pg("Users").select("*"));
  })
  .post(async (req, res) => {});

router
  .route("/profile")
  //Returns Specific user
  .get(async (req, res) => {
    const { user } = req;
    if (user) return res.json(await pg("Users").select("*").where("id", user));
    return;
  });

module.exports = router;
