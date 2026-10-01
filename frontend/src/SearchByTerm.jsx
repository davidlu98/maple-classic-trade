import { useState, useEffect } from "react";
import { Box, InputBase, List, Typography } from "@mui/material";
import SearchByTermRow from "./SearchByTermRow";

const MIN_SEARCH_LENGTH = 2;
const MAX_RESULTS = 50;

export default function SearchByTerm({
  items,
  onItemClick,
  containerSize = "480px",
  clearOnSelect = false,
  selectedItemId = "",
}) {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const hasSearch = normalizedSearch.length >= MIN_SEARCH_LENGTH;

  const results = hasSearch
    ? items
        .filter((item) => item.name.toLowerCase().includes(normalizedSearch))
        .slice(0, MAX_RESULTS)
    : [];

  const handleItemClick = (item) => {
    onItemClick(item);

    if (clearOnSelect) {
      setSearch("");
    } else {
      setSearch(item.name);
    }

    setShowResults(false);
  };

  useEffect(() => {
    if (!selectedItemId) {
      setSearch("");
      return;
    }

    if (clearOnSelect) {
      setSearch("");
      return;
    }

    const selectedItem = items.find(
      (item) => String(item.id) === String(selectedItemId),
    );

    if (selectedItem) {
      setSearch(selectedItem.name);
    }
  }, [selectedItemId, items, clearOnSelect]);

  return (
    <Box
      sx={{
        width: containerSize,
        position: "relative",
        border: "1px solid",
        borderColor: "custom.borderBottom",
      }}
    >
      {/* Search input */}
      <Box sx={{ bgcolor: "custom.filter" }}>
        <InputBase
          sx={{ ml: 1 }}
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);
            setShowResults(value.trim().length >= MIN_SEARCH_LENGTH);

            onItemClick(null);
          }}
          onFocus={() => {
            if (search.trim().length >= MIN_SEARCH_LENGTH) {
              setShowResults(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowResults(false);
            }, 120);
          }}
          placeholder="Search Items"
          fullWidth
        />
      </Box>

      {/* Search results */}
      {hasSearch && showResults && (
        <Box
          sx={{
            bgcolor: "background.default",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <Typography sx={{ color: "text.default", ml: "12px" }}>
            Search Results
          </Typography>

          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <List>
              {results.map((item) => (
                <SearchByTermRow
                  key={item.id}
                  item={item}
                  onItemClick={handleItemClick}
                />
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
}
