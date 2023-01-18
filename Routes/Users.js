const express = require("express");
const router = express.Router();
const pg = require("../utils/db");
const Chat = require("./Chats");

router
  .route("/")
  //Returns all user
  .get(async (req, res) => {
    res.json(await pg("Users").select("*"));
  })
  .post(async (req, res) => {});

router
  .route("/profile")
  //Returns Specific user
  .get(async (req, res) => {
    const { user } = req;
    if (user) return res.json(await pg("Users").select("*").where("id", user));
    return;
  })
  .put(async (req, res) => {
    const { body } = req;
    const { user } = req;
    console.log(req.body);
    console.log(user);
    res.send("Allright");
    try {
      // const result = await pg("Users")
      //   .where("id", req.user)
      //   .update({ ...body });
    } catch (error) {}
  });

//GETS Task from User
router
  .route("/task")
  //Returns Specific user
  .get(async (req, res) => {
    const { user } = req;
    if (user)
      try {
        const result = await pg("Task").select("*").where("users_id", user);
        return res.json(result);
      } catch (error) {
        res.json({
          type: "error",
          message: "Something went wrong with the Querry!",
        });
      }
    return res.status(401).json({ type: "erro", message: "Missing User!" });
  });

module.exports = router;
