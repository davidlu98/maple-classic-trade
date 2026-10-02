import { Box, TextField } from "@mui/material";

export default function LabeledNumberInput({
  label,
  value,
  onChange,
  max,
  gridTemplateColumns = "58% 42%",
}) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: gridTemplateColumns }}>
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
      <TextField
        variant="standard"
        placeholder={label}
        value={value}
        onChange={(e) => {
          const value = e.target.value;

          if (!/^\d*$/.test(value)) {
            return;
          }

          if (value === "") {
            onChange(value);
            return;
          }

          const numericValue = Number(value);

          if (max === undefined || numericValue <= max) {
            onChange(value);
          }
        }}
        sx={{
          bgcolor: "custom.filter",

          "& .MuiInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none",
          },
          "& .MuiInputBase-input": {
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
}
