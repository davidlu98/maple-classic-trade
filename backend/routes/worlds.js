const router = require("express").Router();
const prisma = require("../prismaClient");

// all routes have prefix /worlds

router.get("/all", async (req, res, next) => {
  try {
    const worlds = await prisma.world.findMany({});
    res.status(200).json(worlds);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
