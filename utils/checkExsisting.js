const pg = require("../utils/db");

// Checks email in database and retrives the password
async function userInfo(req, res, next) {
  console.log("Checking User");
  const {
    lastName,
    firstName,
    email,
    password,
    languages,
  } = req.body;
  //Checks if all Values are Provided
  if (!email || !password || !lastName || !firstName || !languages)
    return res
      .status(400)
      .json({ message: "You need to Provide all the Information" });

  const result = await pg("Users")
    .where("email", email)
    .catch((err) => console.log(err));

  //first checks if the email is already in database
  if (result.length !== 0)
    return res
      .status(303)
      .json({ message: "User with that Email already Exist" });

  next();
}

module.exports = { userInfo };
