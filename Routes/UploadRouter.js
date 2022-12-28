const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const { upload } = require("../utils/claudinary");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (error, buffer) => {
      if (error) {
        cb(error, undefined);
      } else {
        cb(null, buffer.toString("hex") + "-" + file.originalname);
      }
    });
  },
});

const fileUpload = multer({ storage });

router.post("/", fileUpload.single("image"), async (req, res) => {
  console.log(req.file);
  // waits for the upload to happen
  const uploadResult = await upload(req.file.path);
  //TODO: Push the UploadResult url to the database with connected to the user
  console.log("test", uploadResult);
  //Deletes the file from the server
  fs.unlink(req.file.path, (error) => {
    if (error) {
      console.error(error);
    }
  });
  res.send("File uploaded");
});

module.exports = router;
