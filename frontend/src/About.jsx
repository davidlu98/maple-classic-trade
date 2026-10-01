import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        pt: 2,
      }}
    >
      <Box
        sx={{
          width: "700px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
        >
          About
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 3, "& li": { mb: 1, pl: 1, lineHeight: 1.6 } }}
        >
          <li>
            MapleClassicTrade is a fan-made marketplace for Maple Classic.
          </li>
          <li>
            It is not endorsed by Nexon and does not reflect the views or
            opinions of Nexon or anyone officially involved in producing or
            managing Nexon properties.
          </li>
          <li>It is heavily inspired by PoE trade and Mapleland.gg.</li>
        </Box>
      </Box>
    </Box>
  );
}
