import { Box, Typography } from "@mui/material";

export default function ListItemDisplay({ item }) {
  return (
    <Box
      sx={{
        bgcolor: "custom.purple",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 225,
        height: 175,
        mt: 2,
        border: "2px solid black",
      }}
    >
      <Typography
        sx={{
          color: item ? "text.primary" : "custom.purple",
          pt: 1,
          textAlign: "center",
        }}
      >
        {item?.name ?? "Item Name"}
      </Typography>

      <Box
        sx={{
          bgcolor: "custom.offwhite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 125,
          height: 125,
          mt: 1,
        }}
      >
        {item && (
          <Box
            component="img"
            src={item.iconUrl}
            alt={item.name}
            sx={{
              width: 100,
              height: 100,
              imageRendering: "pixelated",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
