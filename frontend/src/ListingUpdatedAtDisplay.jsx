import { Box, Typography } from "@mui/material";
import { formatUpdatedAt, returnTimeAgo } from "./utils/formatDate.js";

export default function ListingUpdatedAtDisplay({
  updatedAt,
  getTimeAgo = false,
}) {
  const formattedDate = getTimeAgo
    ? returnTimeAgo(updatedAt)
    : formatUpdatedAt(updatedAt);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Typography sx={{ fontSize: { xs: "15px", md: "14px" } }}>
        {formattedDate}
      </Typography>
    </Box>
  );
}
