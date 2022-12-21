const pg = require("../utils/db");

// Checks email in database and retrives the password
async function userInfo(req, res, next) {
  console.log("Checking User");
  const {lastName,
    firstName,
    email,
    password,
    address,
    phonenumber,
    languages,
    skills,
    image,} = req.body;
  const result = await pg("Users")
  .where("email", email)
  .catch((err) => console.log(err));

  //first checks if the email is already in database
  if(result.length !== 0) return res.status(303).json({error:"User with that Email already Exist"})
  //Checks if all Values are Provided
  if (!email || !password || !lastName || !firstName || !languages) return res.status(400).json({ error: "You need to Provide all the Information" });

  next();
}

module.exports = { userInfo };
