const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  //Gets token from header we send from frontend
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    console.log("user", user);

    if (err) return res.sendStatus(403);

    req.user = user.id;
    next();
  });
}

module.exports = verifyToken;
