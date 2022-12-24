const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Translation Placeholder");
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg("Task").select("*").where("type", "translation"));
});
module.exports = router;
