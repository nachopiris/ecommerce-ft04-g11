const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided" });
  jwt.verify(token, secret, (err, decoded) => {
    if (err) throw err;
    req.userId = decoded.id;
  });
  next();
}

module.exports = verifyToken;
