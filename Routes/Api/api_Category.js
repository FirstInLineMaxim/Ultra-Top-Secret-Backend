const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");

//By Category
router.route("/:category").get(async (req, res) => {
  const { category } = req.params;
  //All types of Categories we have in our Database till now.
  const categories = ["call", "document", "translation"];
  //Checks if the Categorie is present
  if (!categories.includes(category))
    return res
      .statusCode(400)
      .json({ type: "error", message: "Something went Wrong!" });
  const categoryResults = await pg
    .select("*")
    .from("Task")
    .where("type", category);
  res.json(categoryResults);
});

module.exports = router;
