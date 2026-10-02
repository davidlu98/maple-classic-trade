import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const mapleLeafIcon = "/maple-leaf.png";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Navbar({ user, logout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "custom.filter",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <img
              src={mapleLeafIcon}
              alt="mapleLeafIcon"
              style={{
                width: "25px",
                height: "25px",
                padding: "2px",
                pointerEvents: "none",
              }}
            />
            <Typography>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                }}
              >
                MapleClassicTrade
              </Link>
            </Typography>
          </Box>
          {!user ? (
            <Button
              component="a"
              href={`${API_URL}/auth/discord`}
              color="inherit"
              sx={{ bgcolor: "custom.discord" }}
            >
              Login with Discord
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={Link}
                to="/list"
                color="inherit"
                sx={{ bgcolor: "#16a34a", textTransform: "none" }}
              >
                List
              </Button>
              <Button
                component={Link}
                to="/account"
                color="inherit"
                sx={{ bgcolor: "custom.gray", textTransform: "none" }}
              >
                Account
              </Button>
              <Button
                color="inherit"
                sx={{ bgcolor: "custom.discord", textTransform: "none" }}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
