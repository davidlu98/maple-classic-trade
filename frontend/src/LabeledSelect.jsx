import { Box, FormControl, Select, MenuItem } from "@mui/material";

export default function LabeledSelect({
  label,
  value,
  options,
  onChange,
  disabled,
}) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "58% 42%" }}>
      <Box
        sx={{
          bgcolor: "custom.label",
          display: "flex",
          alignItems: "center",
          px: 1,
          borderLeft: "2px solid",
          borderColor: "custom.borderLeft",
        }}
      >
        {label}
      </Box>
      <FormControl variant="standard" sx={{ bgcolor: "custom.filter" }}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disableUnderline
          sx={{
            px: 1,
            textTransform: "uppercase",
            "& .MuiSelect-select": {
              display: "flex",
              justifyContent: "center",
            },
            "& .MuiSelect-icon": { color: "custom.gray", right: 8 },
          }}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
