const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const { upload, destroy } = require("../utils/claudinary");
const crypto = require("crypto");
const pg = require("../utils/db");

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
  const userImage = await pg("Users").select("image").where("id", req.user);
  //Looks up if a image is provided in the user if yes destroy the old one on claudinary
  if (userImage[0]) {
    const url = userImage[0].image;
    const parts = url.split("/");
    const public_id = `${parts[parts.length - 2]}/${
      parts[parts.length - 1].split(".")[0]
    }`;
    destroy(public_id);
  }
  // waits for the upload to happen
  const uploadResult = await upload(req.file.path);
  //TODO: Push the UploadResult url to the database with connected to the user
  await pg("Users").where("id", req.user).update({ image: uploadResult.url });
  //Deletes the file from the server
  fs.unlink(req.file.path, (error) => {
    if (error) {
      console.error(error);
    }
  });
  res.send("File uploaded");
});

module.exports = router;
