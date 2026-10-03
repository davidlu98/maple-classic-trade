import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ListingContainer from "./ListingContainer";

import { Alert, Avatar, Box, Snackbar, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Account({ user }) {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (listingId) => {
    const token = window.localStorage.getItem("token");

    if (!token) return;

    try {
      await axios.delete(`${API_URL}/listings/${listingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setListings((currentListings) =>
        currentListings.filter((listing) => listing.id !== listingId),
      );
    } catch (error) {
      setErrorMessage("Failed to delete listing");
    }
  };

  const handleEdit = async (listingId) => {
    navigate(`/listing/${listingId}/edit`);
  };

  const handleFulfill = async (listingId) => {
    const token = window.localStorage.getItem("token");

    if (!token) return;

    try {
      await axios.patch(`${API_URL}/listings/${listingId}/fulfill`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setListings((currentListings) =>
        currentListings.map((listing) =>
          listing.id === listingId
            ? {
                ...listing,
                status: "FULFILLED",
              }
            : listing,
        ),
      );
    } catch (error) {
      setErrorMessage("Failed to fulfill listing");
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAccountData = async () => {
      const token = window.localStorage.getItem("token");

      if (!token) return;

      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/account/listings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings(response.data.listings);
      } catch (error) {
        setErrorMessage("Failed to fetch account data");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [user]);

  if (!user) {
    return (
      <Typography sx={{ textAlign: "center", color: "red" }}>
        Must be logged in to view Account
      </Typography>
    );
  }

  if (loading) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

  const sellListings = listings.filter(
    (listing) => listing.type === "SELL" && listing.status === "ACTIVE",
  );

  const buyListings = listings.filter(
    (listing) => listing.type === "BUY" && listing.status === "ACTIVE",
  );

  const soldListings = listings.filter(
    (listing) => listing.type === "SELL" && listing.status !== "ACTIVE",
  );

  const boughtListings = listings.filter(
    (listing) => listing.type === "BUY" && listing.status !== "ACTIVE",
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
            sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 0.5 }}
          >
            <Box
              component="img"
              src="/ticket.png"
              sx={{ width: 25, height: 25 }}
            />
            <Typography sx={{ fontSize: { xs: "20px", md: "16px" } }}>
              {sellListings.length + buyListings.length} / 20
            </Typography>
            <Tooltip title="You can have a maximum of 20 active listings. Selling and Looking For each contribute 1 towards the maximum count.">
              <InfoIcon sx={{ fontSize: { xs: "large", md: "medium" } }} />
            </Tooltip>
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
            showActions={true}
            onFulfill={handleFulfill}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addEllipses={true}
          />
          <ListingContainer
            title="Looking For"
            listings={buyListings}
            headerColor="custom.green"
            showActions={true}
            onFulfill={handleFulfill}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addEllipses={true}
          />
          <ListingContainer
            title="Sold"
            listings={soldListings}
            headerColor="custom.blue"
            showActions={(listing) => listing.status !== "FULFILLED"}
            onFulfill={handleFulfill}
            onDelete={handleDelete}
            addEllipses={true}
          />
          <ListingContainer
            title="Bought"
            listings={boughtListings}
            headerColor="custom.green"
            showActions={(listing) => listing.status !== "FULFILLED"}
            onFulfill={handleFulfill}
            onDelete={handleDelete}
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
