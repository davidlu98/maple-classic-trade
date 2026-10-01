import { Box, Typography } from "@mui/material";

export default function ItemStatDifferencesDisplay({
  statDifferences,
  scrollsUsed,
}) {
  if (!statDifferences) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {scrollsUsed === 0 ? (
        <Box sx={{ bgcolor: "custom.purple", borderRadius: 2, px: 0.4 }}>
          <Typography sx={{ fontSize: "14px" }}>Clean</Typography>
        </Box>
      ) : null}
      {statDifferences.map((stat) => {
        if (stat.value === 0) {
          return null;
        }

        const isPositive = stat.value > 0;
        const bgColor = isPositive ? "custom.blue" : "custom.red";

        return (
          <Box
            key={stat.displayName}
            sx={{ bgcolor: bgColor, borderRadius: 2, px: 0.4 }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              {stat.displayName}
              {isPositive ? "+" : ""}
              {stat.value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
