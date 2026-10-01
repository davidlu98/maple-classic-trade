import { Box, Typography } from "@mui/material";

export default function ItemDescriptionDisplay({ description, fontSize }) {
  return (
    <Box sx={{}}>
      <Typography sx={{ fontSize: fontSize, whiteSpace: "pre-line" }}>
        {description}
      </Typography>
    </Box>
  );
}
