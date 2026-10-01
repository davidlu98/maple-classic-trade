import { Box, Typography } from "@mui/material";

export default function ItemQuantityDisplay({ quantity, fontSize = "14px" }) {
  if (!quantity) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ bgcolor: "custom.blue", borderRadius: 2, px: 0.4 }}>
        <Typography
          sx={{
            fontSize: fontSize,
          }}
        >
          QTY: {quantity}
        </Typography>
      </Box>
    </Box>
  );
}
