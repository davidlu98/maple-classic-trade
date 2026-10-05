import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Item from "./Item";
import ItemPriceDisplay from "./ItemPriceDisplay";
import ItemQuantityDisplay from "./ItemQuantityDisplay";
import ItemWorldDisplay from "./ItemWorldDisplay";
import ListingUpdatedAtDisplay from "./ListingUpdatedAtDisplay";
import LabeledNumberInput from "./LabeledNumberInput";
import DiscordCopyMessageButton from "./DiscordCopyMessageButton";

import {
  Alert,
  Avatar,
  Button,
  Box,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Listing() {
  const { listingId } = useParams();

  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axios.get(`${API_URL}/listings/${listingId}`);
        setListing(response.data.listing);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || "Failed to fetch listing data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [listingId]);

  if (loading) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

  if (!listing) {
    return (
      <Typography sx={{ textAlign: "center", color: "red" }}>
        Listing not found
      </Typography>
    );
  }

  const isEquipment = listing.item.category === "Equipment";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        width: "100%",
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "normal" },
          gap: 1,
          width: { xs: "100%", md: "auto" },
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
            src={listing.user.avatar}
            sx={{ width: 128, height: 128, mb: 0.5 }}
            alt="Avatar"
          />
          <Link
            component={RouterLink}
            to={`/user/${listing.user.id}`}
            color="inherit"
            underline="none"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              "&:hover": {
                color: "text.primary",
                textDecoration: "underline",
              },
            }}
          >
            {listing.user.globalName}
          </Link>
          <Typography>@{listing.user.username}</Typography>
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
              href={`https://discord.com/users/${listing.user.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{
                bgcolor: "custom.discord",
                height: 34,
                width: "100%",
              }}
            >
              View Discord Profile (Web)
            </Button>
            <Button
              component="a"
              href={`discord://-/users/${listing.user.discordId}`}
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
            display: "flex",
            flexDirection: "column",
            bgcolor: "black",
            width: { xs: "100%", md: "500px" },
            p: 2,
            gap: 1,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid",
                borderColor: "custom.borderBottom",
                pb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor:
                    listing.type === "SELL" ? "custom.blue" : "custom.green",
                  borderRadius: 1,
                  px: 1.5,
                  height: 36.5,
                }}
              >
                {listing.type === "SELL" ? (
                  listing.status === "ACTIVE" ? (
                    <Typography sx={{ fontSize: "14px" }}>Selling</Typography>
                  ) : (
                    <Typography sx={{ fontSize: "14px" }}>Sold</Typography>
                  )
                ) : listing.status === "ACTIVE" ? (
                  <Typography sx={{ fontSize: "14px" }}>Looking For</Typography>
                ) : (
                  <Typography sx={{ fontSize: "14px" }}>Bought</Typography>
                )}
              </Box>
              <Button
                component={RouterLink}
                to={`/report/${listingId}`}
                variant="contained"
                sx={{ bgcolor: "red", fontSize: "14px" }}
              >
                Report
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <ItemPriceDisplay
                  price={listing.price}
                  fontSize="15px"
                  isEquipment={isEquipment}
                />
                {!isEquipment ? (
                  <ItemQuantityDisplay
                    quantity={listing.quantity}
                    fontSize="15px"
                  />
                ) : null}
                <ItemWorldDisplay world={listing.world.name} />
              </Box>
              <ListingUpdatedAtDisplay updatedAt={listing.updatedAt} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Item item={listing.item} listing={listing} containerSize="320px" />
            {!isEquipment && (
              <Box sx={{ width: "320px" }}>
                <LabeledNumberInput
                  label="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  max={listing.quantity}
                />
              </Box>
            )}

            {listing.status === "ACTIVE" ? (
              <DiscordCopyMessageButton
                listingType={listing.type}
                discordUsername={listing.user.username}
                itemName={listing.item.name}
                itemPrice={listing.price}
                quantity={quantity}
                isEquipment={isEquipment}
                listingLink={`${window.location.origin}/listing/${listingId}`}
              />
            ) : null}
          </Box>
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
