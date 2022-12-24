const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Task Placeholder");
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
