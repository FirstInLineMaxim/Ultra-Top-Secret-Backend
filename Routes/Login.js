const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json("Login Placeholder");
  })
  .post((req, res) => {
    res.json("Login Post Placeholder");
  });

module.exports = router;
