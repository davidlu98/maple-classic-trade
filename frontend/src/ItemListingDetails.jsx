import { Box, Typography } from "@mui/material";

const detailsSx = {
  fontSize: "14px",
};

const valueSx = {
  fontWeight: "bold",
};

export default function ItemListingDetails({
  item,
  listingStats,
  remainingUpgradeSlots,
}) {
  if (!item) return null;

  return (
    <Box>
      {/* Item type */}
      <Typography sx={detailsSx}>
        Type:{" "}
        <span style={valueSx}>
          {item.subCategory === "Weapon" ? item.weaponType : item.subCategory}
        </span>
      </Typography>
      {/* Gender */}
      {item.gender != null && (
        <Typography sx={detailsSx}>
          Gender: <span style={valueSx}>{item.gender}</span>
        </Typography>
      )}
      {/* Attack speed */}
      {item.attackSpeed != null && (
        <Typography sx={detailsSx}>
          Attack Speed:{" "}
          <span style={valueSx}>
            {item.attackSpeedLabel}({item.attackSpeed})
          </span>
        </Typography>
      )}
      {/* Knockback */}
      {item.knockback != null && (
        <Typography sx={detailsSx}>
          Knockback Chance: <span style={valueSx}>{item.knockback}</span>%
        </Typography>
      )}
      {/* Listing stats */}
      {listingStats?.map((stat) => (
        <Typography sx={detailsSx} key={stat.displayName}>
          {stat.displayName}: <span style={valueSx}>+{stat.value}</span>
        </Typography>
      ))}
      {/* Remaining upgrade count */}
      {remainingUpgradeSlots != null && (
        <Typography sx={detailsSx}>
          Remaining Enhancements:{" "}
          <span style={valueSx}>{remainingUpgradeSlots}</span>
        </Typography>
      )}
    </Box>
  );
}
