const router = require("express").Router();
const jwt = require("jsonwebtoken");

// all routes have prefix /account

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.sendStatus(401).json({ error: "No token" });

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
      res.json(user);
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
