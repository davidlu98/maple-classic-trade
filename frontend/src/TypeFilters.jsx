import { Box, Typography } from "@mui/material";
import LabeledSelect from "./LabeledSelect";

const filterConfig = [
  {
    type: "select",
    name: "category",
    label: "Item Category",
    options: [
      { value: "All", label: "All" },
      { value: "Equipment", label: "Equipment" },
      { value: "Consumable", label: "Consumable" },
      { value: "Etc", label: "Etc" },
      { value: "Setup", label: "Setup" },
      { value: "Scroll", label: "Scroll" },
      { value: "Cash", label: "Cash" },
    ],
  },
  {
    type: "select",
    name: "subCategory",
    label: "Item SubCategory",
    options: [
      { value: "All", label: "All" },
      { value: "Weapon", label: "Weapon" },
      { value: "Shield", label: "Shield" },
      { value: "Earring", label: "Earring" },
      { value: "Cape", label: "Cape" },
      { value: "Hat", label: "Hat" },
      { value: "Glove", label: "Glove" },
      { value: "Shoes", label: "Shoes" },
      { value: "Overall", label: "Overall" },
      { value: "Top", label: "Top" },
      { value: "Bottom", label: "Bottom" },
      { value: "Consume", label: "Consume" },
      { value: "Etc", label: "Etc" },
      { value: "Install", label: "Install" },
    ],
  },
  {
    type: "select",
    name: "weaponType",
    label: "Item Weapon Type",
    options: [
      { value: "All", label: "All" },
      { value: "1H Sword", label: "One-Handed Sword" },
      { value: "2H Sword", label: "Two-Handed Sword" },
      { value: "1H Axe", label: "One-Handed Axe" },
      { value: "2H Axe", label: "Two-Handed Axe" },
      { value: "1H Blunt Weapon", label: "One-Handed Blunt" },
      { value: "2H Blunt Weapon", label: "Two-Handed Blunt" },
      { value: "Spear", label: "Spear" },
      { value: "Polearm", label: "Polearm" },
      { value: "Bow", label: "Bow" },
      { value: "Crossbow", label: "Crossbow" },
      { value: "Wand", label: "Wand" },
      { value: "Staff", label: "Staff" },
      { value: "Dagger", label: "Dagger" },
      { value: "Claw", label: "Claw" },
    ],
  },
  {
    type: "select",
    name: "reqJob",
    label: "Job",
    options: [
      { value: "All", label: "All" },
      { value: "Warrior", label: "Warrior" },
      { value: "Mage", label: "Mage" },
      { value: "Bowman", label: "Bowman" },
      { value: "Thief", label: "Thief" },
    ],
  },
  {
    type: "select",
    name: "gender",
    label: "Gender",
    options: [
      { value: "All", label: "All" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
];

export default function TypeFilters({ filters, onFilterChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Box
        sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
      >
        <Typography>TYPE FILTERS</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
        {filterConfig.map((filter) => (
          <LabeledSelect
            key={filter.name}
            label={filter.label}
            value={filters[filter.name]}
            options={filter.options}
            onChange={(value) => onFilterChange(filter.name, value)}
          />
        ))}
      </Box>
    </Box>
  );
}
