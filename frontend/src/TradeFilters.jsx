import { Box, Typography } from "@mui/material";
import LabeledRangeInput from "./LabeledRangeInput";
import LabeledSelect from "./LabeledSelect";

const filterConfig = [
  {
    type: "select",
    name: "world",
    label: "World Name",
    options: [
      { value: "All", label: "All" },
      { value: "Windia", label: "Windia" },
    ],
  },
  {
    type: "range",
    name: "price",
    label: "Price",
  },
];

export default function TradeFilters({ filters, onFilterChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>TRADE FILTERS</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          columnGap: 0.5,
          rowGap: 0.3,
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
              gridTemplateColumns="58% 21% 21%"
            />
          ))}
      </Box>
    </Box>
  );
}
