const pg = require("../utils/db");

// Checks email in database and retrives the password
async function retriveUserInfo(req, res, next) {
  console.log("Checking User");
  console.log(req.body);
  const { email } = req.body;
  if (!email || !req.body.password) return res.status(400).json({ message: "Email and Password is required" });
  const result = await pg("Users")
    .where("email", email)
    .select("password", "id")
    .catch((err) => console.log(err));
  if (result.length === 0)
    return res.status(400).json({ message: "Invalid email or password" });
  const { password, id } = result[0];
  req.body.user = id;
  req.body.hash = password;
  console.log("User Checked");

  next();
}

module.exports = { retriveUserInfo };