import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import SearchFilters from "./SearchFilters";
import ListingContainer from "./ListingContainer";
import { statData } from "./utils/statData";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getInitialFilters = () => ({
  itemId: "",
  category: "All",
  subCategory: "All",
  weaponType: "All",
  reqLevel: {
    min: "",
    max: "",
  },
  reqSTR: {
    min: "",
    max: "",
  },
  reqDEX: {
    min: "",
    max: "",
  },
  reqINT: {
    min: "",
    max: "",
  },
  reqLUK: {
    min: "",
    max: "",
  },
  reqPOP: {
    min: "",
    max: "",
  },
  reqJob: "All",
  gender: "All",
  remainingUpgradeSlots: {
    min: "",
    max: "",
  },
  knockback: {
    min: "",
    max: "",
  },
  attackSpeedLabel: "All",
  world: "All",
  price: {
    min: "",
    max: "",
  },
  stats: [],
});

export default function ListingSearch({ allItems }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState(() => {
    const initial = getInitialFilters();

    return {
      ...initial,
      itemId: searchParams.get("itemId") || "",
      subCategory: searchParams.get("subCategory") || "All",
      weaponType: searchParams.get("weaponType") || "All",
    };
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleItemClick = (item) => {
    setFilters((prev) => ({
      ...prev,
      itemId: item ? item.id : "",
    }));
  };

  const addRangeParams = (params, filter, paramName) => {
    if (filter.min) {
      params.set(`${paramName}Min`, filter.min);
    }

    if (filter.max) {
      params.set(`${paramName}Max`, filter.max);
    }
  };

  const addStatParams = (params, stats) => {
    stats.forEach((stat) => {
      if (stat.min) {
        params.set(`${stat.key}Min`, stat.min);
      }

      if (stat.max) {
        params.set(`${stat.key}Max`, stat.max);
      }
    });
  };

  const getStatsFromSearchParams = (searchParams) => {
    return statData
      .map((stat) => {
        const min = searchParams.get(`${stat.key}Min`) || "";
        const max = searchParams.get(`${stat.key}Max`) || "";

        if (!min && !max) {
          return null;
        }

        return {
          key: stat.key,
          min,
          max,
        };
      })
      .filter(Boolean);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.itemId) {
      params.set("itemId", filters.itemId);
    }

    if (filters.category !== "All") {
      params.set("category", filters.category);
    }

    if (filters.subCategory !== "All") {
      params.set("subCategory", filters.subCategory);
    }

    if (filters.weaponType !== "All") {
      params.set("weaponType", filters.weaponType);
    }

    if (filters.attackSpeedLabel !== "All") {
      params.set("attackSpeedLabel", filters.attackSpeedLabel);
    }

    addRangeParams(params, filters.reqLevel, "reqLevel");
    addRangeParams(params, filters.reqSTR, "reqSTR");
    addRangeParams(params, filters.reqDEX, "reqDEX");
    addRangeParams(params, filters.reqINT, "reqINT");
    addRangeParams(params, filters.reqLUK, "reqLUK");
    addRangeParams(params, filters.reqPOP, "reqPOP");
    addRangeParams(
      params,
      filters.remainingUpgradeSlots,
      "remainingUpgradeSlots",
    );
    addRangeParams(params, filters.knockback, "knockback");
    addRangeParams(params, filters.price, "price");

    if (filters.reqJob !== "All") {
      params.set("reqJob", filters.reqJob);
    }

    if (filters.world !== "All") {
      params.set("world", filters.world);
    }

    if (filters.gender !== "All") {
      params.set("gender", filters.gender);
    }

    addStatParams(params, filters.stats);

    setSearchParams(params);
  };

  const handleClear = () => {
    const initial = getInitialFilters();

    setFilters(initial);
    setSearchParams({});
  };

  const handleSort = (sort) => {
    if (!["recent", "lowest", "highest"].includes(sort)) return;

    const sortedListings = [...listings].sort((a, b) => {
      switch (sort) {
        case "recent":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case "lowest":
          return a.price - b.price;
        case "highest":
          return b.price - a.price;
      }
    });

    setListings(sortedListings);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const params = Object.fromEntries(searchParams.entries());

        const response = await axios.get(`${API_URL}/listings`, {
          params,
        });

        setListings(response.data.listings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchParams]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      itemId: searchParams.get("itemId") || "",
      category: searchParams.get("category") || "All",
      subCategory: searchParams.get("subCategory") || "All",
      weaponType: searchParams.get("weaponType") || "All",
      attackSpeedLabel: searchParams.get("attackSpeedLabel") || "All",
      reqJob: searchParams.get("reqJob") || "All",
      gender: searchParams.get("gender") || "All",
      world: searchParams.get("world") || "All",
      reqLevel: {
        min: searchParams.get("reqLevelMin") || "",
        max: searchParams.get("reqLevelMax") || "",
      },
      reqSTR: {
        min: searchParams.get("reqSTRMin") || "",
        max: searchParams.get("reqSTRMax") || "",
      },
      reqDEX: {
        min: searchParams.get("reqDEXMin") || "",
        max: searchParams.get("reqDEXMax") || "",
      },
      reqINT: {
        min: searchParams.get("reqINTMin") || "",
        max: searchParams.get("reqINTMax") || "",
      },
      reqLUK: {
        min: searchParams.get("reqLUKMin") || "",
        max: searchParams.get("reqLUKMax") || "",
      },
      reqPOP: {
        min: searchParams.get("reqPOPMin") || "",
        max: searchParams.get("reqPOPMax") || "",
      },
      remainingUpgradeSlots: {
        min: searchParams.get("remainingUpgradeSlotsMin") || "",
        max: searchParams.get("remainingUpgradeSlotsMax") || "",
      },
      knockback: {
        min: searchParams.get("knockbackMin") || "",
        max: searchParams.get("knockbackMax") || "",
      },
      price: {
        min: searchParams.get("priceMin") || "",
        max: searchParams.get("priceMax") || "",
      },
      stats: getStatsFromSearchParams(searchParams),
    }));
  }, [searchParams]);

  const sellListings = listings.filter((listing) => listing.type === "SELL");
  const buyListings = listings.filter((listing) => listing.type === "BUY");

  if (loading) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

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
      <Box sx={{ width: { xs: "100%", md: "1520px" } }}>
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onItemClick={handleItemClick}
          onSearch={handleSearch}
          onClear={handleClear}
          allItems={allItems}
        />

        <Box
          sx={{
            bgcolor: "custom.label",
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 1 : 0,
            p: isMobile ? 1 : 0,
            height: isMobile ? "auto" : 50,
          }}
        >
          <Typography>
            {listings.length === 0
              ? "No Results Found"
              : `Showing ${listings.length} Result${listings.length > 1 ? "s" : ""}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              position: isMobile ? "static" : "absolute",
              ...(isMobile ? {} : { position: "absolute", right: 8 }),
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleSort("recent")}
              sx={{ bgcolor: "custom.blue", height: 34 }}
            >
              Recent
            </Button>

            <Button
              variant="contained"
              onClick={() => handleSort("lowest")}
              sx={{ bgcolor: "#C74D00", height: 34, px: 1 }}
            >
              Lowest <KeyboardArrowDownIcon />
            </Button>

            <Button
              variant="contained"
              onClick={() => handleSort("highest")}
              sx={{ bgcolor: "#C74D00", height: 34, px: 1 }}
            >
              Highest <KeyboardArrowUpIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      {listings.length > 0 ? (
        <Box
          sx={{
            bgcolor: "custom.dark",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            width: { xs: "100%", md: "1520px" },
            gap: { xs: 0.5, md: 1 },
            mb: 1,
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
      ) : null}
    </Box>
  );
}
