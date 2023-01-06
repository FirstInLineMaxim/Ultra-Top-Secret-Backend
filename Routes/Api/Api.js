const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");

router.route("task/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
