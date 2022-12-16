const pg = require("../utils/db");

// Checks email in database and retrives the password
async function retriveUserInfo(req, res, next) {
  const { email } = req.body;
  const result = await pg("Users").where("email", email).select("password");
  const { password } = result[0];
  req.body.hash = password;
  next();
}

module.exports = { retriveUserInfo };
