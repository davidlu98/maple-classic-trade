import { Box, Typography } from "@mui/material";

export default function RequirementRow({ label, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ px: 2, py: 2, border: "1px solid black", width: 160 }}>
        {label}
      </Typography>

      {children}
    </Box>
  );
}
