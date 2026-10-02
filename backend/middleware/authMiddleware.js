const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");

async function authMiddleware(req, res, next) {
  // console.log("req headers:", req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No valid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        banned: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.banned) {
      return res.status(403).json({ error: "Your account has been banned" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
