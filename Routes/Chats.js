const express = require("express");
const router = express.Router();
const pg = require("../utils/db");

router
  .route("/")
  .get(async (req, res) => {
    const { user } = req;
    console.log(user);
    try {
      const allChats = await pg("chats")
        .select(
          "chats.*",
          "Users.firstname",
          "Users.lastname",
          "Users.email",
          "Users.languages",
          "Users.image",
          "users2.firstname as createdby_firstname",
          "users2.lastname as createdby_lastname",
          "users2.email as createdby_email",
          "users2.languages as createdby_languages",
          "users2.image as createdby_image"
        )
        .where("created_by", user)
        .orWhere("created_with", user)
        .innerJoin("Users", "Users.id", "chats.created_with")
        .innerJoin("Users as users2", "users2.id", "chats.created_by");

      res.json(allChats);
    } catch (error) {
      res.json({ type: "error", message: "Something went Wrong" });
    }
  })
  .post()
  .put((req, res) => {})
  .delete((req, res) => {});
router.route("/selectedChat/:chat_id").get(async (req, res) => {
  const { chat_id } = req.params;
  const { user } = req;
  try {
    const messages = await pg("messages")
      .select("messages.*")
      .where("chat_id", chat_id)
      .innerJoin("chats", "chats.id", "messages.chat_id");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating chat and messages" });
  }
});
router.route("/new").post(async (req, res) => {
  try {
    const { created_with } = req.body;
    const { user } = req;
    await pg("chats").insert({ created_by: user, created_with: created_with });

    res.status(201).json({ message: "Chat and messages created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating chat and messages" });
  }
});

router.route("/new/message/:chat_id").post(async (req, res) => {
  try {
    const { chat_id } = req.params;
    const { message } = req.body;
    const { user } = req;

    //Writes message and links them together
    await pg("messages").insert({
      chat_id: chat_id,
      text: message,
      created_by: user,
    });
    res.status(201).json({ type: "success", message: "messages send!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating chat and messages" });
  }
});
module.exports = router;
