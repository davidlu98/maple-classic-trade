import { Box, Typography } from "@mui/material";

export default function ItemWorldDisplay({ world, fontSize = "14px" }) {
  if (!world) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ bgcolor: "custom.gray", borderRadius: 2, px: 0.4 }}>
        <Typography
          sx={{
            fontSize: fontSize,
          }}
        >
          {world}
        </Typography>
      </Box>
    </Box>
  );
}
