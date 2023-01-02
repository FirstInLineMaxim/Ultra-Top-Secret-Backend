const bcrypt = require("bcrypt");
const saltRounds = 10;

//Crypts password as middelware and calls next
async function cryptPassword(req, res, next) {
  console.log("CryptPassword");
  const { password } = req.body;
  try {
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        req.body.password = hash;
        next();
      });
    });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
}

//Compares password and return either true or false and calls next
async function comparePassword(req, res, next) {
  console.log("ComparePassword");
  const { password, hash } = req.body;
  try {
    await bcrypt.compare(password, hash, function (err, result) {
      // result == true
      req.body.valid = result;
      next();
    });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
}

module.exports = { cryptPassword, comparePassword };
