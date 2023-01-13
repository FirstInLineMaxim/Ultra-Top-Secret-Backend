const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get((req, res) => {
    res.send("Chat Placeholder");
  })
  .post(async (req, res) => {
    try {
      const { name, messages, created_with } = req.body;
      const newChat = await pg("chats")
        .insert({ name, created_by: req.user })
        .returning("*");

      //Writes message and links them together
      await pg("messages").insert({
        chat_id: newChat[0].id,
        text: messages,
        created_by: req.user,
        created_with: created_with,
      });
      res
        .status(201)
        .json({ message: "Chat and messages created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating chat and messages" });
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
