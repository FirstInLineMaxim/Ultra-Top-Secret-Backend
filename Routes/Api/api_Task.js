const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");

//GET ALL TASK
router.route("/all").get(async (req, res) => {
  const UsersSelect = [
    "role",
    "lastname",
    "firstname",
    "address",
    "email",
    "password",
    "phonenumber",
    "skills",
    "image",
  ];
  res.json(
    await pg
      .select(
        "Task.*",
        "role",
        "lastname",
        "firstname",
        "address",
        "email",
        "phonenumber",
        "skills",
        "image",
        "Users.languages as user_language"
      )
      .from("Task")
      .innerJoin("Users", "Users.id", "Task.users_id")
  );
});
// GET TASK WITH SPECIFIC ID and the Creators Data
router.route("/all/:id").get(async (req, res) => {
  const { id } = req.params;
  //Checks if id is a number
  if (id.match(/[a-zA-Z]/)) {
    return res.json({
      type: "error",
      message: "The id must be a number",
    });
  }
  try {
    const dbResult = await pg
      .select(
        "Task.*",
        "Users.lastname",
        "Users.firstname",
        "Users.email",
        "Users.phonenumber",
        "Users.languages as user_language",
        "Users.image"
      )
      .from("Task")
      .innerJoin("Users", "Users.id", "Task.users_id")
      .where("Task.id", id);
    //Checks if the Result is empty
    if (dbResult.length == 0)
      return res.json({
        type: "info",
        message: "Im sorry such Entrie is not Avaible",
      });
    res.json(dbResult);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
