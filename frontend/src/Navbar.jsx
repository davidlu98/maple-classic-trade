import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const mapleLeafIcon = "/maple-leaf.png";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Navbar({ user, logout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

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
          {/* Logo & Brand */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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

          {/* Logged out */}
          {!user && (
            <Button
              component="a"
              href={`${API_URL}/auth/discord`}
              color="inherit"
              sx={{ bgcolor: "custom.discord" }}
            >
              Login with Discord
            </Button>
          )}

          {user && (
            <>
              {/* Logged in with Desktop */}
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
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

              {/* Logged in with Mobile */}
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-label="open navigation menu"
                  aria-controls={menuOpen ? "navbar-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="navbar-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/list"
                    onClick={handleMenuClose}
                  >
                    List
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/account"
                    onClick={handleMenuClose}
                  >
                    Account
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
