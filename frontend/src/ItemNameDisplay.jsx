import { Typography } from "@mui/material";

export default function ItemNameDisplay({
  name,
  scrollsUsed,
  textAlign = "left",
  addBold = true,
  addBullet = true,
  isEquipment = false,
  statDifferenceColor,
}) {
  if (!name) return;

  return (
    <Typography
      sx={{
        fontSize: "16px",
        color: isEquipment ? statDifferenceColor : "white",
        textAlign,
        fontWeight: addBold ? "bold" : "",
        visibility: name ? "visible" : "hidden",
        "&::before": {
          content: addBullet ? '"•"' : '""',
          marginRight: addBullet ? "3px" : 0,
          color: "#62d9ff",
        },
      }}
    >
      {name} {scrollsUsed > 0 && `(+${scrollsUsed})`}
    </Typography>
  );
}
