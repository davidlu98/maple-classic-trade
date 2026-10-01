const router = require("express").Router();
const prisma = require("../prismaClient");
const { getItemCategory, getAvailableStats } = require("../utils/trading");

const { isPositiveInteger } = require("../utils/validation");

// all routes have prefix /items

router.get("/", async (req, res, next) => {
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        iconUrl: true,
        category: true,
        subCategory: true,
        reqLevel: true,
        reqSTR: true,
        reqDEX: true,
        reqINT: true,
        reqLUK: true,
        reqPOP: true,
        totalUpgradeCount: true,
        baseStats: {
          include: {
            stat: true,
          },
        },
        attackSpeed: true,
        knockback: true,
        reqJobLabel: true,
        reqJobs: true,
        weaponType: true,
        attackSpeedLabel: true,
        gender: true,
      },
    });

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// Return lightweight item data used for the Search component (id, name, iconUrl)
router.get("/search", async (req, res, next) => {
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        iconUrl: true,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        error: "Invalid item ID",
      });
    }

    const itemCategory = await getItemCategory(id);

    if (!itemCategory) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    if (itemCategory === "Equipment") {
      const availableStats = await getAvailableStats(id);

      const item = await prisma.item.findUnique({
        where: { id },
        select: {
          id: true,
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
          reqINT: true,
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
          reqJobs: true,
          gender: true,
          storeSellPrice: true,
        },
      });

      const formattedItem = {
        ...item,
        baseStats: item.baseStats.map((stat) => ({
          displayName: stat.stat.displayName,
          value: stat.value,
        })),
      };

      return res.status(200).json({ item: formattedItem, availableStats });
    }

    const consumableEtcSetupScroll = ["Consumable", "Etc", "Setup", "Scroll"];

    if (consumableEtcSetupScroll.includes(itemCategory)) {
      const item = await prisma.item.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          iconUrl: true,
          category: true,
          storeSellPrice: true,
          description: true,
        },
      });

      return res.status(200).json({ item: item });
    }

    if (itemCategory === "Cash") {
      const item = await prisma.item.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          iconUrl: true,
          category: true,
          subCategory: true,
          description: true,
        },
      });

      return res.status(200).json({ item: item });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
