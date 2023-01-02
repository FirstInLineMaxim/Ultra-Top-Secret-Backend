const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ error: "Authorization header is missing" });
  }

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .send({ error: "JWT_SECRET is not defined in the environment" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid JWT" });
    }
    return res
      .status(400)
      .send({ error: "An error occurred while parsing the JWT" });
  }
}

module.exports = authUser;
