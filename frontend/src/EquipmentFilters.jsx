import { Box, Typography } from "@mui/material";
import LabeledRangeInput from "./LabeledRangeInput";
import LabeledSelect from "./LabeledSelect";

const filterConfig = [
  {
    type: "range",
    name: "remainingUpgradeSlots",
    label: "Remaining Enhancements",
  },
  {
    type: "range",
    name: "knockback",
    label: "Knockback Chance",
  },
  {
    type: "select",
    name: "attackSpeedLabel",
    label: "Attack Speed",
    options: [
      { value: "All", label: "All" },
      { value: "Faster", label: "Faster" },
      { value: "Fast", label: "Fast" },
      { value: "Normal", label: "Normal" },
      { value: "Slow", label: "Slow" },
    ],
  },
];

export default function EquipmentFilters({ filters, onFilterChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>EQUIPMENT FILTERS</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 0.3, md: 0 },
          columnGap: 0.5,
        }}
      >
        {filterConfig
          .filter((filter) => filter.type === "range")
          .map((filter) => (
            <LabeledRangeInput
              key={filter.name}
              label={filter.label}
              value={filters[filter.name]}
              onChange={(value) => onFilterChange(filter.name, value)}
            />
          ))}
      </Box>

      <Box>
        {filterConfig
          .filter((filter) => filter.type === "select")
          .map((filter) => (
            <LabeledSelect
              key={filter.name}
              label={filter.label}
              value={filters[filter.name]}
              options={filter.options}
              onChange={(value) => onFilterChange(filter.name, value)}
            />
          ))}
      </Box>
    </Box>
  );
}
