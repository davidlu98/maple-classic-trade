import { Box, Typography } from "@mui/material";

export default function ItemStatDifferencesDisplay({
  statDifferences,
  scrollsUsed,
  addEllipses,
}) {
  if (!statDifferences) {
    return null;
  }

  const nonZeroStats = statDifferences.filter((stat) => stat.value !== 0);
  const visibleStats = nonZeroStats.slice(0, 4);
  const hasMoreStats = nonZeroStats.length > 4;

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {scrollsUsed === 0 ? (
        <Box sx={{ bgcolor: "custom.purple", borderRadius: 2, px: 0.4 }}>
          <Typography sx={{ fontSize: "14px" }}>Clean</Typography>
        </Box>
      ) : null}

      {addEllipses ? (
        <>
          {visibleStats.map((stat) => {
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
          {hasMoreStats && (
            <Box sx={{ bgcolor: "custom.blue", borderRadius: 2, px: 0.4 }}>
              <Typography sx={{ fontSize: "14px" }}>...</Typography>
            </Box>
          )}
        </>
      ) : (
        <>
          {nonZeroStats.map((stat) => {
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
        </>
      )}
    </Box>
  );
}
