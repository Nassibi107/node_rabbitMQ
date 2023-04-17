const jwt = require("jsonwebtoken");
require("dotenv/config");
exports.verifyToken =  (req, res, next) => {
  const token =req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
   jwt.verify(token,process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next()
};

