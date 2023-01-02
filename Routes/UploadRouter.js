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
        console.error(error);
        cb(null, undefined);
      } else {
        cb(null, buffer.toString("hex") + "-" + file.originalname);
      }
    });
  },
});

const fileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});

router.post("/", fileUpload.single("image"), async (req, res) => {
  try {
    const userImage = await pg("Users").select("image").where("id", req.user);
    //Looks up if a image is provided in the user if yes destroy the old one on claudinary
    if (userImage[0].image !== null) {
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
        res.status(500).send({
          error: "An error occurred while deleting the file from the server",
        });
      } else {
        res.send("File uploaded");
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while accessing the database" });
  }
});

module.exports = router;
