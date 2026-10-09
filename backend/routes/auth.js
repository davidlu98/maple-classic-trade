const router = require("express").Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const prisma = require("../prismaClient");

// all routes have prefix /auth

router.get("/discord", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    scope: "identify",
  });

  res.redirect(`https://discord.com/oauth2/authorize?${params}`);
});

router.get("/discord/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    const avatarUrl = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      : `https://cdn.discordapp.com/embed/avatars/0.png`;

    const dbUser = await prisma.user.upsert({
      where: {
        discordId: user.id,
      },

      update: {
        username: user.username,
        globalName: user.global_name,
        avatar: avatarUrl,
      },

      create: {
        discordId: user.id,
        username: user.username,
        globalName: user.global_name,
        avatar: avatarUrl,
      },
    });

    const token = jwt.sign(
      {
        id: dbUser.id,
        discordId: dbUser.discordId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "OAuth failed",
    });
  }
});

module.exports = router;
