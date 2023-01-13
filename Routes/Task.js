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

router
  .route("/create")
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
        active: true,
        title: title,
        description: description,
        type: type,
        price: price,
        languages: languages,
        users_id: user,
      };
      console.log(taskValues);
      await pg("Task").insert(taskValues);
      res.json({ type: "success", message: "Succesfuly created." });
    } catch (error) {
      res
        .status(400)
        .json({
          type: "error",
          message: "Something went wrong!",
          error: error,
        });
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});

//Gets user Specific Accepted Task
router.route("/accepted").get(async (req, res) => {
  const { user } = req;
  const result = await pg
    .select(
      "Accepted.details",
      "Accepted.time",
      "Accepted.status",
      "Task.title",
      "Task.description",
      "Task.type",
      "Task.languages as task_languages",
      "Users.lastname",
      "Users.firstname",
      "Users.email",
      "Users.phonenumber",
      "Users.languages as user_language",
      "Users.image"
    )
    .from("Accepted")
    .innerJoin("Task", "Task.id", "Accepted.task_id")
    .innerJoin("Users", "Users.id", "Accepted.user_id")
    .where({ "Task.users_id": user });
  res.json(result);
});
module.exports = router;
