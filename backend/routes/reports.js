const router = require("express").Router();
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");
const { isPositiveInteger } = require("../utils/validation");
const HttpError = require("../utils/HttpError");

const { ReportType } = require("@prisma/client");

// all routes have prefix /reports

router.post("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { reportType, reportDetails } = req.body;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    if (!reportType || !reportDetails) {
      return res
        .status(400)
        .json({ error: "Report type and details are required" });
    }

    if (!Object.values(ReportType).includes(reportType)) {
      return res.status(400).json({
        error: "Invalid report type",
      });
    }

    if (
      typeof reportDetails !== "string" ||
      reportDetails.trim().length === 0 ||
      reportDetails.length > 250
    ) {
      return res.status(400).json({
        error: "Report details must be between 1 and 250 characters",
      });
    }

    const details = reportDetails.trim();

    await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              discordId: true,
              username: true,
            },
          },
          item: {
            select: {
              id: true,
              name: true,
            },
          },
          world: {
            select: {
              id: true,
              name: true,
            },
          },
          type: true,
          price: true,
          stats: {
            include: {
              stat: true,
            },
          },
          remainingUpgradeSlots: true,
        },
      });

      if (!listing) {
        throw new HttpError(404, "Listing not found.");
      }

      if (listing.user.id === req.user.id) {
        throw new HttpError(400, "You cannot report your own listing");
      }

      const listingSnapshot = {
        id: listing.id,
        user: {
          id: listing.user.id,
          discordId: listing.user.discordId,
          username: listing.user.username,
        },
        item: {
          id: listing.item.id,
          name: listing.item.name,
        },
        world: {
          id: listing.world.id,
          name: listing.world.name,
        },
        type: listing.type,
        price: listing.price,
        stats: listing.stats.map((listingStat) => ({
          statId: listingStat.statId,
          displayName: listingStat.stat.displayName,
          value: listingStat.value,
        })),
        remainingUpgradeSlots: listing.remainingUpgradeSlots,
      };

      await tx.report.create({
        data: {
          listingId: listing.id,
          reportedUserId: listing.user.id,
          userId: req.user.id,
          type: reportType,
          details,
          listingSnapshot,
        },
      });
    });

    res.sendStatus(201);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "You already reported this listing",
      });
    }

    next(error);
  }
});

module.exports = router;
