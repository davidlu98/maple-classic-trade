import { Box, Typography } from "@mui/material";

export default function Help() {
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
          width: { xs: "100%", md: 700 },
          p: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
        >
          Help
        </Typography>
        <Box
          component="ol"
          sx={{ pl: 3, "& li": { mb: 1, pl: 1, lineHeight: 1.6 } }}
        >
          <li>Login using Discord.</li>
          <li>Search for listings, or create your own.</li>
          <li>
            When you find a listing for an item you want to buy or sell, click
            on "View Details".
          </li>
          <li>
            Inspect the item and click the message below. This message will be
            copied to your clipboard.
          </li>
          <li>
            Click on "View Discord Profile" to bring up the lister's Discord
            profile via web browser or application.
          </li>
          <li>
            Contact the lister by adding them as a friend or send them the
            message copied to your clipboard.
          </li>
          <li>
            Once a transaction has been completed, the lister should mark the
            item as sold/bought, delete the listing, or edit the remaining
            quantity.
          </li>
        </Box>
      </Box>
    </Box>
  );
}
