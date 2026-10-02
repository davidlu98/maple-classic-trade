import ListingRow from "./ListingRow";

import { Box, Typography } from "@mui/material";

export default function ListingContainer({
  containerHeight = "420px",
  title,
  listings,
  headerColor,
  showActions,
  onFulfill,
  onEdit,
  onDelete,
  getTimeAgo = false,
  isHomePage = false,
}) {
  return (
    <Box
      sx={{
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: containerHeight,
        px: 1,
        py: 1,
        gap: 1,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: headerColor,
          flexShrink: 0,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        <Typography sx={{ ml: 1 }}>{title}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
          gap: 1,
        }}
      >
        {listings.map((listing) => (
          <ListingRow
            key={listing.id}
            listing={listing}
            getTimeAgo={getTimeAgo}
            showActions={
              typeof showActions === "function"
                ? showActions(listing)
                : showActions
            }
            onFulfill={onFulfill}
            onEdit={onEdit}
            onDelete={onDelete}
            isHomePage={isHomePage}
          />
        ))}
      </Box>
    </Box>
  );
}
