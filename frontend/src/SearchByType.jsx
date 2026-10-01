import { Box, ButtonBase, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const itemTypes = [
  {
    name: "One-Handed Sword",
    image: "/searchCategoryIcons/oh_sword.png",
    type: "weaponType",
    value: "1H Sword",
  },
  {
    name: "Two-Handed Sword",
    image: "/searchCategoryIcons/th_sword.png",
    type: "weaponType",
    value: "2H Sword",
  },
  {
    name: "One-Handed Axe",
    image: "/searchCategoryIcons/oh_axe.png",
    type: "weaponType",
    value: "1H Axe",
  },
  {
    name: "Two-Handed Axe",
    image: "/searchCategoryIcons/th_axe.png",
    type: "weaponType",
    value: "2H Axe",
  },
  {
    name: "One-Handed Blunt",
    image: "/searchCategoryIcons/oh_blunt.png",
    type: "weaponType",
    value: "1H Blunt Weapon",
  },
  {
    name: "Two-Handed Blunt",
    image: "/searchCategoryIcons/th_blunt.png",
    type: "weaponType",
    value: "2H Blunt Weapon",
  },
  {
    name: "Spear",
    image: "/searchCategoryIcons/spear.png",
    type: "weaponType",
    value: "Spear",
  },
  {
    name: "Polearm",
    image: "/searchCategoryIcons/polearm.png",
    type: "weaponType",
    value: "Polearm",
  },
  {
    name: "Bow",
    image: "/searchCategoryIcons/bow.png",
    type: "weaponType",
    value: "Bow",
  },
  {
    name: "Crossbow",
    image: "/searchCategoryIcons/crossbow.png",
    type: "weaponType",
    value: "Crossbow",
  },
  {
    name: "Wand",
    image: "/searchCategoryIcons/wand.png",
    type: "weaponType",
    value: "Wand",
  },
  {
    name: "Staff",
    image: "/searchCategoryIcons/staff.png",
    type: "weaponType",
    value: "Staff",
  },
  {
    name: "Dagger",
    image: "/searchCategoryIcons/dagger.png",
    type: "weaponType",
    value: "Dagger",
  },
  {
    name: "Claw",
    image: "/searchCategoryIcons/claw.png",
    type: "weaponType",
    value: "Claw",
  },
  {
    name: "Shield",
    image: "/searchCategoryIcons/shield.png",
    type: "subCategory",
    value: "Shield",
  },
  {
    name: "Hat",
    image: "/searchCategoryIcons/hat.png",
    type: "subCategory",
    value: "Hat",
  },
  {
    name: "Top",
    image: "/searchCategoryIcons/top.png",
    type: "subCategory",
    value: "Top",
  },
  {
    name: "Bottom",
    image: "/searchCategoryIcons/bottom.png",
    type: "subCategory",
    value: "Bottom",
  },
  {
    name: "Overall",
    image: "/searchCategoryIcons/overall.png",
    type: "subCategory",
    value: "Overall",
  },
  {
    name: "Cape",
    image: "/searchCategoryIcons/cape.png",
    type: "subCategory",
    value: "Cape",
  },
  {
    name: "Earring",
    image: "/searchCategoryIcons/earring.png",
    type: "subCategory",
    value: "Earring",
  },
  {
    name: "Glove",
    image: "/searchCategoryIcons/glove.png",
    type: "subCategory",
    value: "Glove",
  },
  {
    name: "Shoes",
    image: "/searchCategoryIcons/shoes.png",
    type: "subCategory",
    value: "Shoes",
  },
  {
    name: "Consumable",
    image: "/searchCategoryIcons/consumable.png",
    type: "category",
    value: "Consumable",
  },
  {
    name: "Etc",
    image: "/searchCategoryIcons/etc.png",
    type: "category",
    value: "Etc",
  },
  {
    name: "Setup",
    image: "/searchCategoryIcons/setup.png",
    type: "category",
    value: "Setup",
  },
  {
    name: "Scroll",
    image: "/searchCategoryIcons/scroll.png",
    type: "category",
    value: "Scroll",
  },
  {
    name: "Cash",
    image: "/searchCategoryIcons/cash.png",
    type: "category",
    value: "Cash",
  },
];

export default function SearchByType() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography align="center">Search by Item type</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 54px)",
          width: "fit-content",
          gap: "7px",
        }}
      >
        {itemTypes.map((item) => {
          const params = new URLSearchParams();
          params.set(item.type, item.value);

          return (
            <Tooltip key={item.name} title={item.name}>
              <ButtonBase
                component={Link}
                to={`/search?${params.toString()}`}
                sx={{
                  bgcolor: "custom.filter",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 54,
                  height: 40,
                  border: "1px solid",
                  borderColor: "custom.borderLightGray",
                  overflow: "hidden",
                  transition: "all 120ms ease",
                  borderRadius: "4px",

                  "&:hover": {
                    bgcolor: "#303136",
                    borderColor: "#777",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                ></Box>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
