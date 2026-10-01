const router = require("express").Router();
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");
const {
  calculateStatDifferences,
  getAvailableStats,
} = require("../utils/trading");
const {
  isPositiveInteger,
  isNonNegativeInteger,
} = require("../utils/validation");
const HttpError = require("../utils/HttpError");

const { Job, ListingType } = require("@prisma/client");

// all routes have prefix /listings

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId, type, worldId, price } = req.body;

    if (!isPositiveInteger(itemId)) {
      return res.status(400).json({
        error: "Invalid itemId",
      });
    }

    if (!Object.values(ListingType).includes(type)) {
      return res.status(400).json({
        error: "Invalid listing type",
      });
    }

    if (!isPositiveInteger(worldId)) {
      return res.status(400).json({
        error: "Invalid world ID",
      });
    }

    if (!isPositiveInteger(price)) {
      return res.status(400).json({
        error: "Invalid price",
      });
    }

    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
      select: {
        category: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    const { category } = item;

    const world = await prisma.world.findUnique({
      where: {
        id: worldId,
      },
      select: {
        id: true,
      },
    });

    if (!world) {
      return res.status(404).json({
        error: "World not found",
      });
    }

    const createdAt = new Date();

    let listingData;

    if (category === "Equipment") {
      const { remainingUpgradeSlots, stats } = req.body;

      if (!Array.isArray(stats)) {
        return res.status(400).json({
          error: "Stats must be an array",
        });
      }

      const availableStats = await getAvailableStats(itemId);

      const validStats = [
        ...availableStats.baseStats,
        ...availableStats.optionalStats,
      ];

      const validStatIds = new Set(validStats.map((stat) => stat.id));

      const submittedStatIds = new Set();

      for (const stat of stats) {
        if (!isPositiveInteger(stat.statId)) {
          return res.status(400).json({
            error: "Invalid stat ID",
          });
        }

        if (submittedStatIds.has(stat.statId)) {
          return res.status(400).json({
            error: "A stat cannot be included more than once",
          });
        }

        submittedStatIds.add(stat.statId);

        if (!validStatIds.has(stat.statId)) {
          return res.status(400).json({
            error: `Stat ${stat.statId} is not valid for this item`,
          });
        }

        if (!isPositiveInteger(stat.value)) {
          return res.status(400).json({
            error: "Stat values must be at least 1",
          });
        }
      }

      const requiredStatIds = new Set(
        availableStats.baseStats.map((stat) => stat.id),
      );

      for (const requiredStatId of requiredStatIds) {
        if (!submittedStatIds.has(requiredStatId)) {
          return res.status(400).json({
            error: "All base stats are required",
          });
        }
      }

      if (!isNonNegativeInteger(remainingUpgradeSlots)) {
        return res.status(400).json({
          error: "Invalid remaining enhancements",
        });
      }

      if (remainingUpgradeSlots > availableStats.totalUpgradeCount) {
        return res.status(400).json({
          error:
            "Remaining enhancements cannot exceed the item's total upgrade count",
        });
      }

      listingData = {
        userId,
        itemId,
        worldId,
        type,
        price,
        remainingUpgradeSlots,
        createdAt,
        stats: {
          create: stats.map((stat) => ({
            statId: stat.statId,
            value: stat.value,
          })),
        },
      };
    } else {
      const { quantity } = req.body;

      if (!isPositiveInteger(quantity)) {
        return res.status(400).json({
          error: "Invalid quantity",
        });
      }

      if (quantity > 9999) {
        return res.status(400).json({
          error: "Quantity must be less than 9999",
        });
      }

      listingData = {
        userId,
        itemId,
        worldId,
        type,
        price,
        quantity,
        createdAt,
      };
    }

    await prisma.$transaction(async (tx) => {
      const result = await tx.user.updateMany({
        where: {
          id: userId,
          listingCount: {
            lt: 20,
          },
        },
        data: {
          listingCount: {
            increment: 1,
          },
        },
      });

      if (result.count === 0) {
        throw new HttpError(409, "You can have at most 20 listings.");
      }

      await tx.listing.create({
        data: listingData,
        include: {
          stats: true,
        },
      });
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const { price } = req.body;

    if (!isPositiveInteger(price)) {
      return res.status(400).json({
        error: "Invalid price",
      });
    }

    const listing = await prisma.listing.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        itemId: true,
        status: true,
        item: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.status !== "ACTIVE") {
      throw new HttpError(400, "You cannot edit this listing");
    }

    const category = listing.item.category;

    if (category === "Equipment") {
      const { remainingUpgradeSlots, stats } = req.body;
      const itemId = listing.itemId;

      if (!Array.isArray(stats)) {
        return res.status(400).json({
          error: "Stats must be an array",
        });
      }

      const availableStats = await getAvailableStats(itemId);

      const validStats = [
        ...availableStats.baseStats,
        ...availableStats.optionalStats,
      ];

      const validStatIds = new Set(validStats.map((stat) => stat.id));

      const submittedStatIds = new Set();

      for (const stat of stats) {
        if (!isPositiveInteger(stat.statId)) {
          return res.status(400).json({
            error: "Invalid stat ID",
          });
        }

        if (submittedStatIds.has(stat.statId)) {
          return res.status(400).json({
            error: "A stat cannot be included more than once",
          });
        }

        submittedStatIds.add(stat.statId);

        if (!validStatIds.has(stat.statId)) {
          return res.status(400).json({
            error: `Stat ${stat.statId} is not valid for this item`,
          });
        }

        if (!isPositiveInteger(stat.value)) {
          return res.status(400).json({
            error: "Stat values must be at least 1",
          });
        }
      }

      const requiredStatIds = new Set(
        availableStats.baseStats.map((stat) => stat.id),
      );

      for (const requiredStatId of requiredStatIds) {
        if (!submittedStatIds.has(requiredStatId)) {
          return res.status(400).json({
            error: "All base stats are required",
          });
        }
      }

      if (!isNonNegativeInteger(remainingUpgradeSlots)) {
        return res.status(400).json({
          error: "Invalid remaining enhancements",
        });
      }

      if (remainingUpgradeSlots > availableStats.totalUpgradeCount) {
        return res.status(400).json({
          error:
            "Remaining enhancements cannot exceed the item's total upgrade count",
        });
      }

      await prisma.$transaction(async (tx) => {
        await tx.listing.update({
          where: {
            id,
          },
          data: {
            price,
            remainingUpgradeSlots,
          },
        });

        await tx.listingStat.deleteMany({
          where: {
            listingId: id,
          },
        });

        await tx.listingStat.createMany({
          data: stats.map((stat) => ({
            listingId: id,
            statId: stat.statId,
            value: stat.value,
          })),
        });
      });
    } else {
      const { quantity } = req.body;

      if (!isPositiveInteger(quantity)) {
        return res.status(400).json({
          error: "Invalid quantity",
        });
      }

      if (quantity > 9999) {
        return res.status(400).json({
          error: "Quantity must be less than 9999",
        });
      }

      await prisma.listing.update({
        where: {
          id,
        },
        data: {
          price,
          quantity,
        },
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/fulfill", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.findFirst({
        where: {
          id,
          userId,
        },
        select: {
          // id: true,
          // userId: true,
          status: true,
        },
      });

      if (!listing) {
        throw new HttpError(404, "Listing not found.");
      }

      if (listing.status !== "ACTIVE") {
        throw new HttpError(400, "Only active listings can be fulfilled");
      }

      await tx.listing.update({
        where: {
          id,
        },
        data: {
          status: "FULFILLED",
        },
      });

      const result = await tx.user.updateMany({
        where: {
          id: userId,
          listingCount: {
            gt: 0,
          },
        },
        data: {
          listingCount: {
            decrement: 1,
          },
        },
      });

      if (result.count === 0) {
        throw new Error("Failed to update listing count.");
      }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.findFirst({
        where: {
          id,
          userId,
        },
        select: {
          status: true,
        },
      });

      if (!listing) {
        throw new HttpError(404, "Listing not found.");
      }

      if (listing.status !== "ACTIVE") {
        throw new HttpError(400, "Only active listings can be deleted");
      }

      await tx.listing.delete({
        where: {
          id,
        },
      });

      const result = await tx.user.updateMany({
        where: {
          id: userId,
          listingCount: {
            gt: 0,
          },
        },
        data: {
          listingCount: {
            decrement: 1,
          },
        },
      });

      if (result.count === 0) {
        throw new Error("Failed to update listing count.");
      }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await prisma.listing.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,

        item: {
          select: {
            id: true,
            name: true,
            iconUrl: true,
          },
        },

        type: true,
        world: true,
        price: true,
        quantity: true,
        remainingUpgradeSlots: true,

        status: true,

        stats: {
          select: {
            statId: true,
            value: true,
            stat: {
              select: {
                id: true,
                displayName: true,
                key: true,
              },
            },
          },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.status !== "ACTIVE") {
      return res.status(400).json({ error: "This listing cannot be edited" });
    }

    res.status(200).json({ listing });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id,
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
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

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

    const formattedListing = {
      ...listing,
      item: {
        ...listing.item,
        baseStats,
      },
      stats,
      statDifferences,
      statDifferencesSum,
    };

    res.status(200).json({ listing: formattedListing });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    console.log(req.query);

    const {
      itemId,
      category,
      subCategory,
      weaponType,
      attackSpeedLabel,
      reqJob,
      gender,
      world,
      ...rangeFilters
    } = req.query;

    let parsedItemId;

    if (itemId !== undefined) {
      parsedItemId = Number(itemId);

      if (!isPositiveInteger(parsedItemId)) {
        return res.status(400).json({ error: "Invalid itemId" });
      }
    }

    let parsedGender;

    if (gender !== undefined) {
      parsedGender = gender.toUpperCase();

      if (!["MALE", "FEMALE"].includes(parsedGender)) {
        return res.status(400).json({ error: "Invalid gender" });
      }
    }

    let parsedReqJob;

    if (reqJob !== undefined) {
      parsedReqJob = reqJob.toUpperCase();

      if (!Object.values(Job).includes(parsedReqJob)) {
        return res.status(400).json({
          error: "Invalid reqJob",
        });
      }
    }

    const where = {};

    where.status = "ACTIVE";

    if (world !== undefined) {
      where.world = {
        name: world,
      };
    }

    const itemWhere = {};

    const itemFilters = {
      id: parsedItemId,
      category,
      subCategory,
      weaponType,
      attackSpeedLabel,
      gender: parsedGender,
    };

    for (const [field, value] of Object.entries(itemFilters)) {
      if (value !== undefined) {
        itemWhere[field] = value;
      }
    }

    if (parsedReqJob !== undefined) {
      if (parsedReqJob === "ALL") {
        itemWhere.reqJobs = {
          has: "ALL",
        };
      } else {
        itemWhere.reqJobs = {
          hasSome: [parsedReqJob, "ALL"],
        };
      }
    }

    if (Object.keys(itemWhere).length > 0) {
      where.item = itemWhere;
    }

    const itemRangeFields = new Set([
      "reqLevel",
      "reqSTR",
      "reqDEX",
      "reqINT",
      "reqLUK",
      "reqPOP",
      "knockback",
    ]);

    const listingRangeFields = new Set(["price", "remainingUpgradeSlots"]);

    const listingStatFields = new Set([
      "incPAD",
      "incMAD",
      "incPDD",
      "incMDD",
      "incSTR",
      "incDEX",
      "incINT",
      "incLUK",
      "incMHP",
      "incMMP",
      "incSpeed",
      "incJump",
      "incACC",
      "incEVA",
      "incCRT",
      "incCRD",
    ]);

    const statFilters = {};

    for (const [key, value] of Object.entries(rangeFilters)) {
      const match = key.match(/^(.*)(Min|Max)$/);

      if (!match) continue;

      const [, field, type] = match;

      const number = Number(value);

      if (Number.isNaN(number)) {
        return res.status(400).json({
          error: `Invalid ${key}`,
        });
      }

      const operator = type === "Min" ? "gte" : "lte";

      if (itemRangeFields.has(field)) {
        where.item ??= {};
        where.item[field] ??= {};
        where.item[field][operator] = number;
      }

      if (listingRangeFields.has(field)) {
        where[field] ??= {};
        where[field][operator] = number;
      }

      if (listingStatFields.has(field)) {
        statFilters[field] ??= {};
        statFilters[field][operator] = number;
      }
    }

    for (const [statKey, filter] of Object.entries(statFilters)) {
      where.AND ??= [];

      where.AND.push({
        stats: {
          some: {
            stat: {
              key: statKey,
            },
            value: filter,
          },
        },
      });
    }

    console.log(where);

    // Query database
    const listings = await prisma.listing.findMany({
      where,
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

    res.status(200).json({ listings: formattedListings });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
