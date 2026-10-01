import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Item from "./Item";
import ListingRequirements from "./ListingRequirements";
import listingConfigs from "./utils/listingConfigs";
import {
  isPositiveNumberInput,
  isPositiveNumberBelow,
  isNonNegativeNumberInput,
} from "./utils/validation";

import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function EditListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);

  const [requirements, setRequirements] = useState({
    type: "",
    world: "",
    price: "",
    quantity: "",
    remainingUpgradeSlots: "",
    stats: [],
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [worldList, setWorldList] = useState([]);
  const [optionalStats, setOptionalStats] = useState([]);
  const [totalUpgradeCount, setTotalUpgradeCount] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRequirementChange = (requirementName, value) => {
    setRequirements((prev) => ({
      ...prev,
      [requirementName]: value,
    }));
  };

  const handleStatsChange = (stats) => {
    setRequirements((prev) => ({
      ...prev,
      stats,
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!isPositiveNumberInput(requirements.price)) {
      setErrorMessage("Invalid price");
      return;
    }

    if (listingConfig.requiresQuantity) {
      if (!isPositiveNumberInput(requirements.quantity)) {
        setErrorMessage("Invalid quantity");
        return;
      }

      if (!isPositiveNumberBelow(requirements.quantity, 10000)) {
        setErrorMessage("Quantity must be less than 9999");
        return;
      }
    }

    if (listingConfig.requiresUpgradeSlots) {
      if (!isNonNegativeNumberInput(requirements.remainingUpgradeSlots)) {
        setErrorMessage("Invalid remaining enhancements");
        return;
      }

      if (Number(requirements.remainingUpgradeSlots) > totalUpgradeCount) {
        setErrorMessage(
          "Remaining enhancements cannot exceed the item's total upgrade count",
        );
        return;
      }
    }

    if (listingConfig.requiresStats) {
      const hasInvalidStats = requirements.stats.some(
        (stat) => !isPositiveNumberBelow(stat.value, 1000),
      );

      if (hasInvalidStats) {
        setErrorMessage("All stat values are required to be between 1 and 999");
        return;
      }
    }

    const listingData = {
      price: Number(requirements.price),
    };

    if (listingConfig.requiresQuantity) {
      listingData.quantity = Number(requirements.quantity);
    }

    if (listingConfig.requiresUpgradeSlots) {
      listingData.remainingUpgradeSlots = Number(
        requirements.remainingUpgradeSlots,
      );
    }

    if (listingConfig.requiresStats) {
      listingData.stats = requirements.stats.map((stat) => ({
        statId: stat.statId,
        value: Number(stat.value),
      }));
    }

    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in");
        return;
      }

      await axios.patch(`${API_URL}/listings/${listingId}`, listingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/account`);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to edit listing");
    }
  };

  useEffect(() => {
    const fetchEditData = async () => {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const listingResponse = await axios.get(
          `${API_URL}/listings/${listingId}/edit`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const listing = listingResponse.data.listing;

        console.log(listing);

        setListing(listing);

        setRequirements({
          type: listing.type,
          world: String(listing.world.id),
          price: String(listing.price),
          quantity: String(listing.quantity),
          remainingUpgradeSlots:
            listing.remainingUpgradeSlots !== null
              ? String(listing.remainingUpgradeSlots)
              : "",
          stats: [],
        });

        const itemResponse = await axios.get(
          `${API_URL}/items/${listing.item.id}`,
        );

        const itemData = itemResponse.data;

        setSelectedItem(itemData.item);

        const itemListingConfig = listingConfigs[itemData.item.category];

        if (itemListingConfig.requiresStats) {
          const requiredStatsIds = new Set(
            itemData.availableStats.baseStats.map((stat) => stat.id),
          );

          const listingStatsById = new Map(
            listing.stats.map((stat) => [stat.statId, stat.value]),
          );

          const requiredStats = itemData.availableStats.baseStats.map(
            (stat) => ({
              statId: stat.id,
              statName: stat.displayName,
              value: String(listingStatsById.get(stat.id) ?? ""),
              required: true,
            }),
          );

          const existingOptionalStats = listing.stats
            .filter((stat) => !requiredStatsIds.has(stat.statId))
            .map((stat) => ({
              statId: stat.statId,
              statName: stat.stat.displayName,
              value: String(stat.value),
              required: false,
            }));

          setRequirements((prev) => ({
            ...prev,
            stats: [...requiredStats, ...existingOptionalStats],
          }));

          setOptionalStats(itemData.availableStats.optionalStats);
        }

        if (itemListingConfig.requiresUpgradeSlots) {
          setTotalUpgradeCount(itemData.item.totalUpgradeCount);
        } else {
          setTotalUpgradeCount(null);
        }
      } catch (error) {
        console.error(`Error fetching listing data for listing ${listingId}`);

        setErrorMessage(
          error.response?.data?.error || "Failed to fetch listing data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEditData();
  }, [listingId]);

  const listingConfig = selectedItem
    ? listingConfigs[selectedItem.category]
    : null;

  useEffect(() => {
    const fetchWorlds = async () => {
      try {
        const response = await axios.get(`${API_URL}/worlds/all`);
        setWorldList(response.data);
      } catch (error) {
        console.error("Error fetching world list");
      }
    };

    fetchWorlds();
  }, []);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        pt: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Item item={selectedItem} />

        <ListingRequirements
          requirements={requirements}
          onRequirementChange={handleRequirementChange}
          onStatsChange={handleStatsChange}
          optionalStats={optionalStats}
          worldList={worldList}
          listingConfig={listingConfig}
          isEditing={true}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={false}
          sx={{ bgcolor: "custom.blue", height: 34 }}
        >
          Edit Listing
        </Button>
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
