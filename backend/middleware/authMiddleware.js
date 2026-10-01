const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // console.log("req headers:", req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No valid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
