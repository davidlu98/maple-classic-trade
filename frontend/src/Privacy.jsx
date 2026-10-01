import { Box, Typography } from "@mui/material";

export default function Privacy() {
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
          Privacy
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>What is collected</Typography>
        <Typography>
          We collect your Discord ID, username, global name, and avatar. We use
          Discord authentication to provide you with an access token. No
          passwords or email addresses are ever collected or stored.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>Why it is collected</Typography>
        <Typography>
          Your Discord ID and username allow us to connect listings to your
          account. The Discord ID is a more stable identifier than your in-game
          Classic Maplestory name. Your global name and avatar are used to
          display your profile.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          What we don't collect
        </Typography>
        <Typography>
          We never collect or store your Discord password or email address.
          Authentication is handled through Discord rather than requiring us to
          create and store a separate account password.{" "}
        </Typography>
      </Box>
    </Box>
  );
}
