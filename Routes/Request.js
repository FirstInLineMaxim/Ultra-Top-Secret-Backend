const express = require("express");
const authUser = require("../utils/authUser");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/create")
  .get((req, res) => {
    res.send("Task Placeholder");
  })
  .post(async (req, res) => {
    const { user } = req;
    const {
      title,
      description,
      type,
      fromLanguage,
      toLanguage,
      dueDate,
      dueTime,
    } = req.body;
    console.log(req.body);
    if (
      !title ||
      !description ||
      !type ||
      !fromLanguage ||
      !toLanguage ||
      !user ||
      !dueDate ||
      !dueTime
    ) {
      return res.status(400).json({
        type: "error",
        message: "You need to fill out all the Information",
      });
    }
    try {
      const taskValues = {
        title: title,
        description: description,
        type: type,
        toLanguage: toLanguage,
        fromLanguage: fromLanguage,
        dueDate: dueDate,
        dueTime: dueTime,
        user_id: user,
      };
      await pg("requests").insert(taskValues);
      res.json({ type: "success", message: "Succesfuly created." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ type: "error", message: "Something went wrong!" });
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
module.exports = router;
