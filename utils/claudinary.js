const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function upload(imagePath) {
  cloudinary.uploader.upload(
    imagePath,
    { folder: "userImage" },
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );
}

function destroy(public_id) {
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
}

module.exports = { upload, destroy };
