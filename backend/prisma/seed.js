const prisma = require("../prismaClient");

const worldData = [{ name: "Windia" }];

const itemData = require("./items.json");
const cashItemData = require("./cash_shop");

const statData = [
  { key: "incPAD", displayName: "ATK" },
  { key: "incMAD", displayName: "M.ATK" },
  { key: "incPDD", displayName: "DEF" },
  { key: "incMDD", displayName: "M.DEF" },
  { key: "incSTR", displayName: "STR" },
  { key: "incDEX", displayName: "DEX" },
  { key: "incINT", displayName: "INT" },
  { key: "incLUK", displayName: "LUK" },
  { key: "incMHP", displayName: "HP" },
  { key: "incMMP", displayName: "MP" },
  { key: "incSpeed", displayName: "Speed" },
  { key: "incJump", displayName: "Jump" },
  { key: "incACC", displayName: "ACC" },
  { key: "incEVA", displayName: "Avoid" },
  { key: "incCRT", displayName: "Crit Rate" },
  { key: "incCRD", displayName: "Crit Damage" },
];

const SCROLL_CATEGORY_MAP = {
  Hat: "Hat",
  Earring: "Earring",
  Topwear: "Top",
  Overall: "Overall",
  Bottomwear: "Bottom",
  Shoes: "Shoes",
  Gloves: "Glove",
  Shield: "Shield",
  Cape: "Cape",
  "One-Handed": "Weapon",
  Dagger: "Weapon",
  Wand: "Weapon",
  Staff: "Weapon",
  "Two-handed": "Weapon",
  Spear: "Weapon",
  Polearm: "Weapon",
  Bow: "Weapon",
  Crossbow: "Weapon",
  Claw: "Weapon",
};

const JOB_MAP = {
  Warrior: "WARRIOR",
  Bowman: "BOWMAN",
  Mage: "MAGE",
  Thief: "THIEF",
  Pirate: "PIRATE",
};

function parseReqJobs(label) {
  if (!label) return [];

  if (label == "All") {
    return ["ALL"];
  }

  return label
    .split("/")
    .map((job) => JOB_MAP[job])
    .filter(Boolean);
}

function getIconUrl(itemId) {
  return `https://raw.githubusercontent.com/ohmi69/osms_datamine_dashboard/main/data/current/images/items/${String(itemId).padStart(8, "0")}.png`;
}

async function main() {
  // 1. Seed every possible Stat
  await prisma.stat.createMany({
    data: statData,
    skipDuplicates: true,
  });

  const stats = await prisma.stat.findMany();

  const statMap = new Map(stats.map((stat) => [stat.key, stat.id]));

  // 2. Seed the item data (Equipment, Consumables, Etc, Setup)
  for (const item of itemData.items) {
    const rawStats = item.stats;

    // Do not add quest items or items that cannot be sold or are trade blocked
    const isQuestItem = rawStats.quest;
    const cannotBeSold = rawStats.notSale;
    const isTradeBlocked = rawStats.tradeBlock;

    if (isQuestItem || cannotBeSold || isTradeBlocked) {
      continue;
    }

    const newItem = await prisma.item.upsert({
      where: {
        id: item.id,
      },
      update: {
        name: item.name,
        iconUrl: getIconUrl(item.id),
        category: item.category,
        subCategory: item.sub_category,
        weaponType: item.weapon_type ?? null,
        attackSpeed: rawStats.attackSpeed ?? null,
        attackSpeedLabel: item.attack_speed_label ?? null,
        reqLevel: rawStats.reqLevel ?? 0,
        reqSTR: rawStats.reqSTR ?? 0,
        reqDEX: rawStats.reqDEX ?? 0,
        reqINT: rawStats.reqINT ?? 0,
        reqLUK: rawStats.reqLUK ?? 0,
        reqPOP: rawStats.reqPOP ?? 0,
        totalUpgradeCount: rawStats.tuc ?? null,
        knockback: rawStats.knockback ?? null,
        reqJobLabel: item.req_job_label ?? null,
        reqJobs: parseReqJobs(item.req_job_label),
        gender:
          item.gender === "male"
            ? "MALE"
            : item.gender === "female"
              ? "FEMALE"
              : null,
        storeSellPrice:
          item.category === "Equipment"
            ? (Number(item.price) ?? 0)
            : rawStats.price,
        description: item.description ?? null,
      },
      create: {
        id: item.id,
        name: item.name,
        iconUrl: getIconUrl(item.id),
        category: item.category,
        subCategory: item.sub_category,
        weaponType: item.weapon_type ?? null,
        attackSpeed: rawStats.attackSpeed ?? null,
        attackSpeedLabel: item.attack_speed_label ?? null,
        reqLevel: rawStats.reqLevel ?? 0,
        reqSTR: rawStats.reqSTR ?? 0,
        reqDEX: rawStats.reqDEX ?? 0,
        reqINT: rawStats.reqINT ?? 0,
        reqLUK: rawStats.reqLUK ?? 0,
        reqPOP: rawStats.reqPOP ?? 0,
        totalUpgradeCount: rawStats.tuc ?? null,
        knockback: rawStats.knockback ?? null,
        reqJobLabel: item.req_job_label ?? null,
        reqJobs: parseReqJobs(item.req_job_label),
        gender:
          item.gender === "male"
            ? "MALE"
            : item.gender === "female"
              ? "FEMALE"
              : null,
        storeSellPrice:
          item.category === "Equipment"
            ? (Number(item.price) ?? 0)
            : rawStats.price,
        description: item.description ?? null,
      },
    });

    // Only inc* properties become ItemBaseStat records
    for (const [key, value] of Object.entries(rawStats)) {
      if (!key.startsWith("inc")) {
        continue;
      }

      const statId = statMap.get(key);

      if (!statId) {
        console.warn(`Unknown stat "${key}" on item ${item.id} ${item.name}`);
        continue;
      }

      await prisma.itemBaseStat.upsert({
        where: {
          itemId_statId: {
            itemId: newItem.id,
            statId,
          },
        },
        update: {
          value: Number(value),
        },
        create: {
          itemId: newItem.id,
          statId,
          value: Number(value),
        },
      });

      console.log(`Seeded item ${newItem.id} ${newItem.name}`);
    }
  }

  // 3. Seed the scroll data
  for (const scroll of itemData.scrolls) {
    const nameStartsWith = scroll.name.split(" ")[0];

    const scrollSubCategory = SCROLL_CATEGORY_MAP[nameStartsWith] || null;

    const newScroll = await prisma.item.upsert({
      where: {
        id: scroll.id,
      },
      update: {
        name: scroll.name,
        iconUrl: getIconUrl(scroll.id),
        category: "Scroll",
        subCategory: scrollSubCategory,
        storeSellPrice: 1,
        description: scroll.description,
      },
      create: {
        id: scroll.id,
        name: scroll.name,
        iconUrl: getIconUrl(scroll.id),
        category: "Scroll", // custom category used for querying
        subCategory: scrollSubCategory,
        storeSellPrice: 1,
        description: scroll.description,
      },
    });

    console.log(`Seeded scroll ${newScroll.id} ${newScroll.name}`);
  }

  // 4. Seed the cash data
  for (const cashItemCategory of cashItemData.categories) {
    for (const cashItem of cashItemCategory.items) {
      const canBeSold = cashItem.on_sale;

      if (!canBeSold) {
        continue;
      }

      const newCash = await prisma.item.upsert({
        where: {
          id: cashItem.id,
        },
        update: {
          name: cashItem.name,
          iconUrl: getIconUrl(cashItem.id),
          category: "Cash",
          subCategory: cashItem.sub_category ?? null,
          description: cashItem.description,
        },
        create: {
          id: cashItem.id,
          name: cashItem.name,
          iconUrl: getIconUrl(cashItem.id),
          category: "Cash", // custom category used for querying
          subCategory: cashItem.sub_category ?? null,
          description: cashItem.description,
        },
      });

      console.log(`Seeded cash item ${newCash.id} ${newCash.name}`);
    }
  }

  // 5. Seed the worlds
  await prisma.world.createMany({
    data: worldData,
    skipDuplicates: true,
  });

  console.log("Finished seeding worlds");
  console.log("Finished seeding all items");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
