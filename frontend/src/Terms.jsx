import { Box, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "auto",
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
          Terms of Service
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          Last updated: September 30, 2026
        </Typography>
        <Typography>
          Welcome to MapleClassicTrade. These Terms of Service govern your
          access to and use of this website.
        </Typography>
        <Typography>
          By using this website, you agree to these Terms. If you do not agree
          with these Terms, please do not use this website.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          1. About MapleClassicTrade
        </Typography>
        <Typography>
          MapleClassicTrade is an <b>unofficial, fan-made marketplace </b>
          created for the Classic Maplestory community.
        </Typography>

        <Typography>
          We are{" "}
          <b>
            not assiciated with, endorsed by, sponsored by, or officially
            associated with Nexon, Maplestory, or any of their respective owners
            or affiliates.
          </b>
        </Typography>
        <Typography>
          MapleClassicTrade exists independently to provide a community
          marketplace.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          2. Accounts and Discord Authentication
        </Typography>
        <Typography>
          MapleClassicTrade uses Discord for authentication.
        </Typography>
        <Typography>
          By signing in through Discord, you authorize us to receive the
          inforamtion made available to us through Discord's authentication
          system, namely your Discord ID, username, global name, and avatar.
          Please check the <b>Privacy</b> page for more details on how your data
          is collected and used.
        </Typography>
        <Typography>
          We do not request or store your Discord password.
        </Typography>
        <Typography>
          You are responsible for activity conducted through your account and
          for maintaining the security of your Discord account.
        </Typography>
        <Typography>
          We may suspend or terminate accounts that violate these Terms or that
          we reasonably believe are being used for{" "}
          <b>scamming, RMT, or other unlawful activity.</b>
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          3. Marketplace Listings
        </Typography>
        <Typography>
          Users may search for and create listings for items.
        </Typography>
        <Typography>By creating a listing, you agree that:</Typography>
        <Typography sx={{ ml: 2 }}>
          1. Your listing is accurate and not intentionally misleading.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          2. You will accurately describe the item, quantity, and price.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          3. You will not use a listing to deceive, defraud, harass, or
          otherwise harm another user.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          4. You will comply with all the rules of the game.
        </Typography>
        <Typography>
          We may remove listings that violate these Terms.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          4. Transactions Between Users
        </Typography>
        <Typography>
          MapleClassicTrade is a platform that connects buyers and sellers.
        </Typography>
        <Typography>
          We are <b>not the seller or buyer of items listed by users</b> and are
          not a party to transacations between users.
        </Typography>
        <Typography>
          Users are responsible for determining whether a transaction is
          appropriate and permitted before completing it.
        </Typography>
        <Typography>We do not guarantee that:</Typography>
        <Typography sx={{ ml: 2 }}>
          1. A seller will complete a transaction.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          2. A buyer will complete a transaction.
        </Typography>
        <Typography sx={{ ml: 2 }}>3. A listed item exists.</Typography>
        <Typography sx={{ ml: 2 }}>4. A listing is accurate.</Typography>
        <Typography sx={{ ml: 2 }}>
          4. A user will respond back to you if you contact them.
        </Typography>
        <Typography>
          Users should be cautious when interacting with other users. Please
          verify the item(s) you are purchasing are as listed and <b>report</b>{" "}
          <b>scams, RMT, and other unlawful activities.</b>
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          5. Prohibited Activities
        </Typography>
        <Typography>You may not use this website to:</Typography>
        <Typography sx={{ ml: 2 }}>
          1. Commit fraud, scams, theft, or other unlawful activity.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          2. Impersonate another person or organization.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          3. Provide false or misleading information.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          4. Create fraudulent or deceptive listings.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          5. Sell or offer items that you do not have the right to sell or
          provide.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          6. Harass, threaten, abuse, or dox another user.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          7. Exploit bugs or vulnerabilities in the website.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          8. Manipulate listings, prices, or other website functionalities.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          9. Use automated systems to scrape, overload, or abuse the website
          without our permission.
        </Typography>
        <Typography sx={{ ml: 2 }}>
          10. Use the website for any purpose that violates applicable law.
        </Typography>
        <Typography>
          We may take action against accounts or listings that violate these
          rules, including removing content, restricting functionality,
          suspending accounts, or permanently terminating access to the website.
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>
          6. Refunds and Disputes
        </Typography>
        <Typography>Transactions are between the buyer and seller.</Typography>
        <Typography>
          Users should first attempt to resolve transaction disputes directly
          with the other party.
        </Typography>
        <Typography>
          If you believe a listing is being used for{" "}
          <b>scamming, RMT, or other unlawful activity, report it.</b> Provide
          sufficient details, such as Discord screenshots supporting your
          claims.
        </Typography>
      </Box>
    </Box>
  );
}
