const router = require("express").Router();
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");

// all routes have prefix /feedback

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { feedbackDetails } = req.body;

    if (!feedbackDetails) {
      return res.status(400).json({ error: "Feedback details are required" });
    }

    if (
      typeof feedbackDetails !== "string" ||
      feedbackDetails.trim().length === 0 ||
      feedbackDetails.length > 1000
    ) {
      return res.status(400).json({
        error: "Feedback details must be between 1 and 1000 characters",
      });
    }

    const details = feedbackDetails.trim();

    const latestFeedback = await prisma.feedback.findFirst({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latestFeedback) {
      const now = new Date();
      const timeSinceLastFeedback =
        now.getTime() - latestFeedback.createdAt.getTime();

      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (timeSinceLastFeedback < twentyFourHours) {
        const remainingTime = twentyFourHours - timeSinceLastFeedback;

        const remainingHours = Math.ceil(remainingTime / (60 * 60 * 1000));

        return res.status(429).json({
          error: `You can submit feedback again in approximately ${remainingHours} hour${remainingHours === 1 ? "" : "s"}`,
        });
      }
    }

    await prisma.feedback.create({
      data: {
        userId: req.user.id,
        details,
      },
    });

    res.sendStatus(201);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "You already submitted feedback",
      });
    }

    next(error);
  }
});

module.exports = router;
