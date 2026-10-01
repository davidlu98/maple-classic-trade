import { Box, Typography } from "@mui/material";

export default function ItemPriceDisplay({
  price,
  fontSize = "15px",
  isListing = false,
  isEquipment = false,
}) {
  if (price == null) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
      {isListing === true ? (
        <>
          <Typography sx={{ fontSize: fontSize }}>
            Store Price: {price.toLocaleString()}
          </Typography>
          <Box
            component="img"
            src="/meso_coin4.png"
            sx={{ width: 18, height: 18 }}
          />
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: fontSize }}>
            {isEquipment ? "Price:" : "Price Per:"} {price.toLocaleString()}
          </Typography>
          <Box
            component="img"
            src="/meso_coin4.png"
            sx={{ width: 18, height: 18 }}
            // sx={{ width: 22, height: 22 }}
          />
        </>
      )}
    </Box>
  );
}
