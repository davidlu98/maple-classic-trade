import { Box, Typography } from "@mui/material";
import LabeledRangeInput from "./LabeledRangeInput";

const filterConfig = [
  {
    type: "range",
    name: "reqLevel",
    label: "Level",
  },
  {
    type: "range",
    name: "reqPOP",
    label: "Fame",
  },
  {
    type: "range",
    name: "reqSTR",
    label: "STR",
  },
  {
    type: "range",
    name: "reqDEX",
    label: "DEX",
  },
  {
    type: "range",
    name: "reqINT",
    label: "INT",
  },
  {
    type: "range",
    name: "reqLUK",
    label: "LUK",
  },
];

export default function RequirementFilters({ filters, onFilterChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>REQUIREMENT FILTERS</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 0.5,
          rowGap: 0.3,
        }}
      >
        {filterConfig.map((filter) => (
          <LabeledRangeInput
            key={filter.name}
            label={filter.label}
            value={filters[filter.name]}
            onChange={(value) => onFilterChange(filter.name, value)}
          />
        ))}
      </Box>
    </Box>
  );
}
