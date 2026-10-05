import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchByTerm from "./SearchByTerm";
import SearchByType from "./SearchByType";
import ListingContainer from "./ListingContainer";

import { Box, Button, Typography } from "@mui/material";

const MAX_LISTINGS_SHOWN = 6;

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home({ items }) {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);

  const handleItemClick = (item) => {
    if (!item) return;

    navigate(`/search?itemId=${item.id}`);
  };

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const response = await axios.get(`${API_URL}/listings/recent`);

        setListings(response.data.listings);
      } catch (error) {
        console.error("Failed to fetch recent listing data");
      }
    };

    fetchRecentListings();
  }, []);

  const sellListings = listings
    .filter((listing) => listing.type === "SELL")
    .slice(0, MAX_LISTINGS_SHOWN);
  const buyListings = listings
    .filter((listing) => listing.type === "BUY")
    .slice(0, MAX_LISTINGS_SHOWN);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        width: "100%",
        pt: 2,
        gap: { xs: 1, md: 3 },
      }}
    >
      <Box
        sx={{
          bgcolor: "custom.filter",
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            How to Get Started
          </Typography>
          <Typography>1. Join the MapleClassicTrade Discord server.</Typography>
          <Typography>2. Turn on DM from server members.</Typography>
          <Typography>3. You are ready to go!</Typography>
        </Box>
        <Button
          component="a"
          href="https://discord.gg/DGfSkuMJHz"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ bgcolor: "custom.discord" }}
        >
          Join Discord
        </Button>
      </Box>

      <SearchByTerm items={items} onItemClick={handleItemClick} />
      <SearchByType />

      <Box sx={{ minWidth: { xs: "100%", md: "1050px" } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "1050px" },
            bgcolor: "custom.label",
            height: 40,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Recently Listed</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "custom.dark",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            width: { xs: "100%", md: "1050px" },
            gap: { xs: 0.5, md: 1 },
          }}
        >
          <ListingContainer
            title="Selling"
            listings={sellListings}
            headerColor="custom.blue"
            showActions={false}
            getTimeAgo={true}
            addEllipses={true}
          />
          <ListingContainer
            title="Looking For"
            listings={buyListings}
            headerColor="custom.green"
            showActions={false}
            getTimeAgo={true}
            addEllipses={true}
          />
        </Box>
      </Box>
    </Box>
  );
}
