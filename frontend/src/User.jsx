import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ListingContainer from "./ListingContainer";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function User() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axios.get(`${API_URL}/user/${userId}`);

        setUser(response.data.user);
        setListings(response.data.listings);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || "Failed to fetch user's listing data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

  if (!user) {
    return (
      <Typography sx={{ textAlign: "center", color: "red" }}>
        User not found
      </Typography>
    );
  }

  const sellListings = listings.filter(
    (listing) => listing.type === "SELL" && listing.status === "ACTIVE",
  );

  const buyListings = listings.filter(
    (listing) => listing.type === "BUY" && listing.status === "ACTIVE",
  );

  const soldListings = listings.filter(
    (listing) => listing.type === "SELL" && listing.status === "FULFILLED",
  );

  const boughtListings = listings.filter(
    (listing) => listing.type === "BUY" && listing.status === "FULFILLED",
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "auto",
        width: "100%",
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "normal" },
          gap: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: "custom.label",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: { xs: "100%", md: "280px" },
            p: 2,
            gap: 0.5,
            borderRadius: 2,
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{ width: 128, height: 128, mb: 0.5 }}
            alt="Avatar"
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {user.globalName}
          </Typography>
          <Typography>@{user.username}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 0.5,
              gap: 1,
              width: { xs: "100%", md: "250px" },
            }}
          >
            <Button
              component="a"
              href={`https://discord.com/users/${user.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{ bgcolor: "custom.discord", height: 34, width: "100%" }}
            >
              View Discord Profile (Web)
            </Button>
            <Button
              component="a"
              href={`discord://-/users/${user.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{ bgcolor: "custom.discord", height: 34, width: "100%" }}
            >
              View Discord Profile (App)
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "custom.dark",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            width: { xs: "100%", md: "1200px" },
            gap: { xs: 0.5, md: 1 },
          }}
        >
          <ListingContainer
            title="Selling"
            listings={sellListings}
            headerColor="custom.blue"
            showActions={false}
            addEllipses={true}
          />
          <ListingContainer
            title="Looking For"
            listings={buyListings}
            headerColor="custom.green"
            showActions={false}
            addEllipses={true}
          />
          <ListingContainer
            title="Sold"
            listings={soldListings}
            headerColor="custom.blue"
            showActions={false}
            addEllipses={true}
          />
          <ListingContainer
            title="Bought"
            listings={boughtListings}
            headerColor="custom.green"
            showActions={false}
            addEllipses={true}
          />
        </Box>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
