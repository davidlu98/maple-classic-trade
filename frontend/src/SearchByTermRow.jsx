import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function SearchByTermRow({ item, onItemClick }) {
  return (
    <ListItemButton
      onClick={() => {
        onItemClick(item);
      }}
      sx={{ gap: 1, px: 1.5 }}
    >
      <ListItemIcon
        sx={{
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
      </ListItemIcon>
      <ListItemText primary={item.name} sx={{ color: "white" }} />
    </ListItemButton>
  );
}
