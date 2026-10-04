import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function SearchByTermRow({ item, onItemClick }) {
  const isCash = item.category === "Cash";

  return (
    <ListItemButton
      onClick={() => {
        onItemClick(item);
      }}
      sx={{ gap: 1, px: 1.5 }}
    >
      <ListItemIcon
        sx={{
          position: "relative",
          bgcolor: "custom.filter",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          minWidth: 36,
          border: "1px solid",
          borderColor: "custom.borderLightGray",
          borderRadius: "4px",
        }}
      >
        <img src={item.iconUrl} alt={item.name} />
        {isCash && (
          <Box
            component="img"
            src="/cash_icon.png"
            alt=""
            sx={{
              position: "absolute",
              width: 12,
              height: 12,
              right: 0,
              bottom: 2,
            }}
          />
        )}
      </ListItemIcon>

      <ListItemText primary={item.name} sx={{ color: "white" }} />
    </ListItemButton>
  );
}
