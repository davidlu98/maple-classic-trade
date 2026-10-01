const router = require("express").Router();
const prisma = require("../prismaClient");

const { calculateStatDifferences } = require("../utils/trading");

// all routes have prefix /user

// Get all the listings from this user
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        discordId: true,
        username: true,
        globalName: true,
        avatar: true,
      },
    });

    const listings = await prisma.listing.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        user: true,
        item: {
          select: {
            name: true,
            iconUrl: true,
            category: true,
            subCategory: true,
            weaponType: true,
            attackSpeed: true,
            attackSpeedLabel: true,
            reqLevel: true,
            reqSTR: true,
            reqDEX: true,
            reqLUK: true,
            reqPOP: true,
            totalUpgradeCount: true,
            baseStats: {
              select: {
                value: true,
                stat: {
                  select: {
                    displayName: true,
                  },
                },
              },
            },
            knockback: true,
            reqJobLabel: true,
            reqJobs: true,
            gender: true,
            storeSellPrice: true,
            description: true,
          },
        },
        world: true,
        type: true,
        price: true,
        quantity: true,
        status: true,
        stats: {
          select: {
            stat: {
              select: {
                displayName: true,
              },
            },
            value: true,
          },
        },
        remainingUpgradeSlots: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const formattedListings = listings.map((listing) => {
      const baseStats = listing.item.baseStats.map((stat) => ({
        displayName: stat.stat.displayName,
        value: stat.value,
      }));

      const stats = listing.stats.map((stat) => ({
        displayName: stat.stat.displayName,
        value: stat.value,
      }));

      const statDifferences = calculateStatDifferences(baseStats, stats);

      const statDifferencesSum = statDifferences.reduce(
        (total, stat) => total + stat.value,
        0,
      );

      return {
        ...listing,
        item: {
          ...listing.item,
          baseStats,
        },
        stats,
        statDifferences,
        statDifferencesSum,
      };
    });

    res.status(200).json({ user, listings: formattedListings });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
