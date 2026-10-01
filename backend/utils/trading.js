const prisma = require("../prismaClient");

const calculateStatDifferences = (baseStats, listingStats) => {
  const baseStatMap = new Map(
    baseStats.map((stat) => [stat.displayName, stat.value]),
  );

  const listingStatMap = new Map(
    listingStats.map((stat) => [stat.displayName, stat.value]),
  );

  const allStatNames = new Set([
    ...baseStatMap.keys(),
    ...listingStatMap.keys(),
  ]);

  return Array.from(allStatNames).map((displayName) => ({
    displayName,
    value:
      (listingStatMap.get(displayName) ?? 0) -
      (baseStatMap.get(displayName) ?? 0),
  }));
};

const SCROLL_MODIFIERS = {
  Shield: ["DEF", "M.DEF", "ACC"],
  Earring: ["STR", "DEX", "INT", "LUK", "Crit Damage", "Avoid"],
  Cape: ["DEF", "M.DEF", "STR", "DEX", "INT", "LUK", "ACC"],
  Hat: ["ACC", "HP", "MP"],
  Glove: ["ATK", "M.ATK", "ACC", "Crit Rate"],
  Shoes: ["Jump", "Speed", "Avoid"],
  Overall: ["DEF", "M.DEF", "STR", "DEX", "INT", "LUK"],
  Top: ["DEF", "M.DEF", "HP", "MP"],
  Bottom: ["DEF", "M.DEF", "HP", "MP"],
};

async function getItemCategory(itemId) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    select: {
      category: true,
    },
  });

  if (!item) {
    return null;
  }

  return item.category;
}

async function getAvailableStats(itemId) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    select: {
      category: true,
      subCategory: true,
      baseStats: {
        select: {
          stat: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
      },
    },
  });

  if (!item) {
    return null;
  }

  const scrollModifiers = SCROLL_MODIFIERS[item.subCategory] ?? [];
  const baseStats = item.baseStats.map(({ stat }) => ({
    id: stat.id,
    displayName: stat.displayName,
  }));

  const baseStatNames = new Set(baseStats.map((stat) => stat.displayName));

  const optionalStatNames = scrollModifiers.filter(
    (statName) => !baseStatNames.has(statName),
  );

  const optionalStats = await prisma.stat.findMany({
    where: {
      displayName: {
        in: optionalStatNames,
      },
    },
    select: {
      id: true,
      displayName: true,
    },
  });

  return {
    baseStats,
    optionalStats,
  };
}

module.exports = {
  calculateStatDifferences,
  SCROLL_MODIFIERS,
  getItemCategory,
  getAvailableStats,
};
