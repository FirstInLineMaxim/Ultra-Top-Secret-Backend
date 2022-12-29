const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.cookie("myCookie", "cookievalue", {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie("anotherCookie", "anothervalue", {
      maxAge: 900000,
      httpOnly: true,
    });
    res.send("Cookies set");
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg("Accepted").select("*"));
});
module.exports = router;
