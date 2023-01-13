const pg = require("./db");

async function checkIfEmailExists(email) {
  try {
    const result = await pg("Users").where("email", email);
    return result.length !== 0;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while checking the database.");
  }
}

// Checks email in database and retrieves the password
async function signUpUserInfo(req, res, next) {
  console.log("Checking User");
  const { lastname, firstname, email, password, language } = req.body;
  console.log(lastname, firstname, email, password, language);
  // Checks if all Values are Provided
  if (!email || !password || !lastname || !firstname || !language)
    return res.status(400).json({
      type: "info",
      message: "You need to Provide all the Information",
    });

  try {
    // First checks if the email is already in database
    const emailExists = await checkIfEmailExists(email);
    if (emailExists)
      return res
        .status(303)
        .json({ type: "info", message: "User with that Email already Exist" });

    next();
  } catch (error) {
    return res.status(500).json({ type: "error", message: error.message });
  }
}

module.exports = { signUpUserInfo };
