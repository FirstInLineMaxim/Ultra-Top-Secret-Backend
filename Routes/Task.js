const express = require("express");
const authUser = require("../utils/authUser");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Task Placeholder");
  })
  .post(authUser, async (req, res) => {
    const { title, description, type, price, languages, user } = req.body;
      const taskValues = {
        title: title,
        description: description,
        type: type,
        price: price,
        languages: languages,
        users_id: user,
      };
      await pg("Task").insert(taskValues);
      res.json({ type: "info", message: "Succesfuly created." });
    
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
