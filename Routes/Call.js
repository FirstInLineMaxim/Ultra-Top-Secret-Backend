const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Call Placeholder")
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {})

module.exports = router;
