const express = require("express");
const authUser = require("../utils/authUser");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("GET Task Placeholder");
  })
  .post((req, res) => {
    res.send("POST Task Placeholder");
  })
  .put((req, res) => {
    res.send("PUT Task Placeholder");
  })
  .delete((req, res) => {
    res.send("DELETE Task Placeholder");
  });

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
