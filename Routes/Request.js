const express = require("express");
const authUser = require("../utils/authUser");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Task Placeholder");
  })
  .post(async (req, res) => {
    const { user } = req;
    const { title, description, type, price, languages } = req.body;
    if (!title || !description || !type || !price || !languages || !user) {
      return res.status(400).json({
        type: "error",
        message: "You need to fill out all the Information",
      });
    }
    try {
      const taskValues = {
        active: active,
        title: title,
        description: description,
        type: type,
        price: price,
        languages: languages,
        users_id: user,
      };
      await pg("Task").insert(taskValues);
      res.json({ type: "success", message: "Succesfuly created." });
    } catch (error) {
      res.status(400).json({ type: "error", message: "Something went wrong!" });
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
