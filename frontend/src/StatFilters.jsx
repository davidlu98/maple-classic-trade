import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { statData } from "./utils/statData";
import LabeledRangeInput from "./LabeledRangeInput";

export default function StatFilters({ value, onChange }) {
  const stats = value;

  const handleAddStat = (key) => {
    if (!key) return;

    if (stats.some((stat) => stat.key === key)) {
      return;
    }

    onChange([
      ...stats,
      {
        key,
        min: "",
        max: "",
      },
    ]);
  };

  const handleRemoveStat = (key) => {
    onChange(stats.filter((stat) => stat.key !== key));
  };

  const handleStatChange = (key, newValue) => {
    onChange(
      stats.map((stat) => (stat.key === key ? { ...stat, ...newValue } : stat)),
    );
  };

  const availableStats = statData.filter(
    (stat) => !stats.some((selected) => selected.key === stat.key),
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>STAT FILTERS</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.35 }}>
        {stats.map((stat) => {
          const statInfo = statData.find((item) => item.key === stat.key);

          if (!statInfo) return null;

          return (
            <Box
              key={stat.key}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 32px",
                alignItems: "center",
              }}
            >
              <LabeledRangeInput
                label={statInfo.displayName}
                value={{ min: stat.min, max: stat.max }}
                onChange={(newValue) => handleStatChange(stat.key, newValue)}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => handleRemoveStat(stat.key)}
                  color="error"
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Select
        value=""
        displayEmpty
        variant="standard"
        disableUnderline
        onChange={(e) => handleAddStat(e.target.value)}
        sx={{
          bgcolor: "custom.filter",
          px: 1,
          "& .MuiSelect-select": {
            display: "flex",
            justifyContent: "center",
          },
          "& .MuiSelect-icon": {
            color: "custom.gray",
            right: 8,
          },
        }}
      >
        <MenuItem value="" disabled>
          + Add Stat
        </MenuItem>

        {availableStats.map((stat) => (
          <MenuItem key={stat.key} value={stat.key}>
            {stat.displayName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
