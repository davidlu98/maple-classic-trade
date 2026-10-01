import { useNavigate } from "react-router-dom";

import SearchByTerm from "./SearchByTerm";
import SearchByType from "./SearchByType";

import { Box } from "@mui/material";

export default function Home({ items }) {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (!item) return;

    navigate(`/search?itemId=${item.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <SearchByTerm items={items} onItemClick={handleItemClick} />
        <SearchByType />
      </Box>
    </Box>
  );
}
