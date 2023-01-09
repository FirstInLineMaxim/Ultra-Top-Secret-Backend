const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");


//GET ALL TASK
router.route("/all").get(async (req, res) => {
  res.json(await pg.select("*").from("Task"));
});
// GET TASK WITH SPECIFIC ID
router.route("/all/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  //Checks if id is a number
  if (id.match(/[a-zA-Z]/)) {
    return res.json({
      type: "error",
      message: "The id must be a number",
    });
  }
  try {
    const dbResult = await pg.select("*").from("Task").where("id", id);
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
