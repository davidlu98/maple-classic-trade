import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import LabeledNumberInput from "./LabeledNumberInput";

export default function ListingStats({
  stats,
  optionalStats = [],
  mode,
  onChange,
  isEditing = false,
}) {
  const handleAddStat = (stat) => {
    if (!stat) return;

    if (stats.some((existingStat) => existingStat.statId === stat.id)) {
      return;
    }

    const newStat = {
      statId: stat.id,
      statName: stat.displayName,
      value: "",
      required: false,
    };

    onChange([...stats, newStat]);
  };

  const handleUpdateStatValue = (statId, value) => {
    onChange(
      stats.map((stat) => (stat.statId === statId ? { ...stat, value } : stat)),
    );
  };

  const handleRemoveStat = (statId) => {
    onChange(stats.filter((stat) => stat.statId !== statId));
  };

  if (mode === "required") {
    const requiredStats = stats.filter((stat) => stat.required);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, mt: 1 }}>
        <Box
          sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
        >
          <Typography>
            {isEditing ? "EDIT REQUIRED STATS" : "REQUIRED STATS"}
          </Typography>
        </Box>

        {/* Required Stats */}
        {requiredStats.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
            {requiredStats.map((stat) => (
              <LabeledNumberInput
                key={stat.statId}
                label={`${stat.statName} (Total)`}
                value={stat.value}
                onChange={(value) => handleUpdateStatValue(stat.statId, value)}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  }

  const selectedOptionalStats = stats.filter((stat) => !stat.required);

  const unusedOptionalStats = optionalStats.filter(
    (optionalStat) => !stats.some((stat) => stat.statId === optionalStat.id),
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.4,
        mt: 1,
      }}
    >
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>
          {isEditing ? "EDIT OPTIONAL STATS" : "OPTIONAL STATS"}
        </Typography>
      </Box>

      {/* Optional Stats */}
      {selectedOptionalStats.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
          {selectedOptionalStats.map((stat) => (
            <Box
              key={stat.statId}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 32px",
                alignItems: "center",
              }}
            >
              <LabeledNumberInput
                label={stat.statName}
                value={stat.value}
                onChange={(value) => handleUpdateStatValue(stat.statId, value)}
                gridTemplateColumns="61% 39%"
              />

              <IconButton
                onClick={() => handleRemoveStat(stat.statId)}
                color="error"
                sx={{ width: 32, height: 32 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Add Optional Stat */}
      <Select
        value=""
        displayEmpty
        variant="standard"
        disableUnderline
        disabled={unusedOptionalStats.length === 0}
        onChange={(e) => {
          const stat = optionalStats.find(
            (stat) => stat.id === Number(e.target.value),
          );

          handleAddStat(stat);
        }}
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

        {unusedOptionalStats.map((stat) => (
          <MenuItem key={stat.id} value={stat.id}>
            {stat.displayName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
