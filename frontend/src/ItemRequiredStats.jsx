import { Box, Typography } from "@mui/material";

const statSx = {
  fontSize: "10px",
};

export default function ItemRequiredStats({ item }) {
  return (
    <Box>
      <Typography sx={statSx}>REQ LEV : {item.reqLevel ?? 0}</Typography>
      <Typography sx={statSx}>REQ STR : {item.reqSTR ?? 0}</Typography>
      <Typography sx={statSx}>REQ DEX : {item.reqDEX ?? 0}</Typography>
      <Typography sx={statSx}>REQ INT : {item.reqINT ?? 0}</Typography>
      <Typography sx={statSx}>REQ LUK : {item.reqLUK ?? 0}</Typography>
      <Typography sx={statSx}>REQ FAM : {item.reqPOP ?? 0}</Typography>
    </Box>
  );
}
