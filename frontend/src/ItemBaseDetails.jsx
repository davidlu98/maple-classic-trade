import { Box, Typography } from "@mui/material";

const detailsSx = {
  fontSize: "14px",
  "&::before": {
    content: '"•"',
    marginRight: "3px",
    color: "#ff8200",
  },
};

const valueSx = {
  fontWeight: "bold",
};

export default function ItemBaseDetails({ item }) {
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
      {/* Base stats */}
      {item.baseStats?.map((stat) => (
        <Typography sx={detailsSx} key={stat.displayName}>
          {stat.displayName}: <span style={valueSx}>+{stat.value}</span>
        </Typography>
      ))}
      {/* Upgrade count */}
      {item.totalUpgradeCount != null && (
        <Typography sx={detailsSx}>
          Remaining Enhancements:{" "}
          <span style={valueSx}>{item.totalUpgradeCount}</span>
        </Typography>
      )}
    </Box>
  );
}
