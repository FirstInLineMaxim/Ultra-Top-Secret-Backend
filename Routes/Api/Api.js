const express = require("express");
const router = express.Router();
const pg = require("../../utils/db");
const api_Task = require("./api_Task");
const api_Category = require("./api_Category");
const api_Language = require("./api_Language");
//Routes
router.use("/task", api_Task);
router.use("/category", api_Category);
router.use("/language", api_Language);

module.exports = router;
