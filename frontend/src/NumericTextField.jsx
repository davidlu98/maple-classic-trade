import { TextField } from "@mui/material";

export default function NumericTextField({ value, onChange, width = 80 }) {
  return (
    <TextField
      value={value}
      onChange={(e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
          onChange(value);
        }
      }}
      slotProps={{
        htmlInput: {
          inputMode: "numeric",
        },
      }}
      sx={{
        width,
      }}
    ></TextField>
  );
}
