import { Box, TextField } from "@mui/material";

export default function LabeledRangeInput({
  label,
  value,
  onChange,
  gridTemplateColumns = "60% 20% 20%",
}) {
  const handleChange = (field) => (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      onChange({ ...value, [field]: value });
    }
  };

  const textFieldSx = {
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
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumns,
      }}
    >
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
        placeholder="MIN"
        value={value.min}
        onChange={handleChange("min")}
        sx={textFieldSx}
      />
      <TextField
        variant="standard"
        placeholder="MAX"
        value={value.max}
        onChange={handleChange("max")}
        sx={{ ...textFieldSx, ml: 0.5 }}
      />
    </Box>
  );
}
