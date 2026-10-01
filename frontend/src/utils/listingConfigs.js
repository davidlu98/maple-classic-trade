const listingConfigs = {
  Equipment: {
    requiresQuantity: false,
    requiresUpgradeSlots: true,
    requiresStats: true,
  },
  Etc: {
    requiresQuantity: true,
    requiresUpgradeSlots: false,
    requiresStats: false,
  },
  Consumable: {
    requiresQuantity: true,
    requiresUpgradeSlots: false,
    requiresStats: false,
  },
  Setup: {
    requiresQuantity: true,
    requiresUpgradeSlots: false,
    requiresStats: false,
  },
  Scroll: {
    requiresQuantity: true,
    requiresUpgradeSlots: false,
    requiresStats: false,
  },
  Cash: {
    requiresQuantity: true,
    requiresUpgradeSlots: false,
    requiresStats: false,
  },
};

export default listingConfigs;
