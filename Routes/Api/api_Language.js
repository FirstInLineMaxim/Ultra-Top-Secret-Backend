const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");
const codes = require("../../utils/languageCodes638-1");

//By Category
router.route("/:language").get(async (req, res) => {
  const { language } = req.params;
  //Checks if the Categorie is present
  if (!codes.includes(language))
    return res.json({ type: "error", message: "Something went Wrong!" });
  const languageResults = await pg
    .select("*")
    .from("Task")
    .where("languages", "@>", [language]); // This will use the PostgreSQL @> operator, which checks if an array contains all elements of another array.
  res.json(languageResults);
});

module.exports = router;
