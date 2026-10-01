import { useState } from "react";

import SearchByTerm from "./SearchByTerm";
import TypeFilters from "./TypeFilters";
import RequirementFilters from "./RequirementFilters";
import EquipmentFilters from "./EquipmentFilters";
import TradeFilters from "./TradeFilters";
import StatFilters from "./StatFilters";

import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function SearchFilters({
  filters,
  onFilterChange,
  onItemClick,
  onSearch,
  onClear,
  allItems,
}) {
  const [filtersVisible, setFiltersVisible] = useState(true);

  const handleToggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: 1,
        gap: 1,
      }}
    >
      <SearchByTerm
        items={allItems}
        onItemClick={onItemClick}
        selectedItemId={filters.itemId}
        containerSize="750px"
      />

      {filtersVisible && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <TypeFilters filters={filters} onFilterChange={onFilterChange} />
            <RequirementFilters
              filters={filters}
              onFilterChange={onFilterChange}
            />
            <EquipmentFilters
              filters={filters}
              onFilterChange={onFilterChange}
            />
            <TradeFilters filters={filters} onFilterChange={onFilterChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <StatFilters
              value={filters.stats}
              onChange={(value) => onFilterChange("stats", value)}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ position: "relative", width: "100%", height: 34 }}>
        <Button
          variant="contained"
          onClick={onSearch}
          sx={{
            bgcolor: "custom.blue",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            height: 34,
          }}
        >
          Search
        </Button>

        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: 0,
            gap: 0.5,
          }}
        >
          <Button
            variant="contained"
            onClick={onClear}
            sx={{
              bgcolor: "custom.filter",
              height: 34,
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleToggleFilters}
            sx={{ bgcolor: "custom.blue", height: 34, px: 1 }}
          >
            {filtersVisible ? (
              <>
                Hide Filters
                <KeyboardArrowUpIcon />
              </>
            ) : (
              <>
                Show Filters
                <KeyboardArrowDownIcon />
              </>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
