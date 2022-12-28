const jwt = require("jsonwebtoken");
function authUser(req, res, next) {
    const token = req.headers.authorization
    console.log(token)
      if (!token) {
        console.log("!token")
		return res.status(401).end()
	}

	let payload 
	try {
		// Parse the JWT string and store the result in `payload`.
		// Note that we are passing the key in this method as well. This method will throw an error
		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
		// or if the signature does not match
        console.log("try")
		payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
	} catch (e) {
        console.log("catch")
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
        console.log(e)
			return res.status(401).end()
		}
		// otherwise, return a bad request error
        console.log("400")
		return res.status(400)
	}
	req.user = payload.userId
    next()
  }
module.exports = authUser