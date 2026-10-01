import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchByTerm from "./SearchByTerm";
import Item from "./Item";
import ListingRequirements from "./ListingRequirements";
import listingConfigs from "./utils/listingConfigs";
import {
  isPositiveNumberInput,
  isPositiveNumberBelow,
  isNonNegativeNumberInput,
} from "./utils/validation";

import { Alert, Box, Button, Snackbar } from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function List({ items, fetchUser }) {
  const navigate = useNavigate();

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

  const fetchItemData = async (itemId) => {
    const response = await axios.get(`${API_URL}/items/${itemId}`);

    return response.data;
  };

  const listingConfig = selectedItem
    ? listingConfigs[selectedItem.category]
    : null;

  const handleItemClick = async (item) => {
    if (!item) {
      return;
    }

    setSelectedItem(item);
    setOptionalStats([]);
    setErrorMessage("");

    try {
      const itemData = await fetchItemData(item.id);

      const listingType = itemData.item.category;
      const itemListingConfig = listingConfigs[listingType];

      setSelectedItem(itemData.item);

      setRequirements({
        type: "",
        world: "",
        price: "",
        quantity: "",
        remainingUpgradeSlots: "",
        stats: [],
      });

      if (itemListingConfig.requiresStats) {
        const requiredStats = itemData.availableStats.baseStats.map((stat) => ({
          statId: stat.id,
          statName: stat.displayName,
          value: "",
          required: true,
        }));

        setRequirements((prev) => ({
          ...prev,
          stats: requiredStats,
        }));
      }

      setOptionalStats(
        itemListingConfig.requiresStats
          ? itemData.availableStats.optionalStats
          : [],
      );

      if (itemListingConfig.requiresUpgradeSlots) {
        setTotalUpgradeCount(itemData.item.totalUpgradeCount);
      } else {
        setTotalUpgradeCount(null);
      }
    } catch (error) {
      console.error(`Error fetching data for item ${item.id}`);

      setSelectedItem(null);
      setOptionalStats([]);

      setRequirements((prev) => ({
        ...prev,
        stats: [],
      }));
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!selectedItem) {
      setErrorMessage("No item selected");
      return;
    }

    if (!listingConfig) {
      setErrorMessage("Invalid listing type");
      return;
    }

    if (!requirements.type) {
      setErrorMessage("No listing type selected");
      return;
    }

    if (!requirements.world) {
      setErrorMessage("No world selected");
      return;
    }

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
      itemId: Number(selectedItem.id),
      type: requirements.type,
      worldId: Number(requirements.world),
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

      await axios.post(`${API_URL}/listings`, listingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUser();

      navigate(`/account`);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to create listing",
      );
    }
  };

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
        <SearchByTerm
          items={items}
          onItemClick={handleItemClick}
          containerSize="500px"
          selectedItemId={selectedItem?.id}
          clearOnSelect
        />

        {selectedItem && <Item item={selectedItem} />}

        <ListingRequirements
          requirements={requirements}
          onRequirementChange={handleRequirementChange}
          onStatsChange={handleStatsChange}
          optionalStats={optionalStats}
          worldList={worldList}
          listingConfig={listingConfig}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedItem}
          sx={{ bgcolor: "custom.blue", height: 34 }}
        >
          Create Listing
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
