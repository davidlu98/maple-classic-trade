import LabeledSelect from "./LabeledSelect";
import LabeledNumberInput from "./LabeledNumberInput";
import ListingStats from "./ListingStats";

import { Box, Typography } from "@mui/material";

const requirementList = [
  {
    type: "select",
    name: "type",
    label: "Listing Type",
  },
  {
    type: "select",
    name: "world",
    label: "World Name",
  },
  {
    type: "numberInput",
    name: "quantity",
    label: "Quantity",
  },
  {
    type: "numberInput",
    name: "remainingUpgradeSlots",
    label: "Remaining Enhancements",
  },
  {
    type: "numberInput",
    name: "price",
    label: "Price",
  },
];

export default function ListingRequirements({
  requirements,
  onRequirementChange,
  onStatsChange,
  optionalStats,
  worldList,
  listingConfig,
  isEditing = false,
}) {
  const worldOptions = worldList.map((world) => ({
    value: world.id,
    label: world.name,
  }));

  const listingTypeOptions = [
    {
      value: "SELL",
      label: "Sell",
    },
    {
      value: "BUY",
      label: "Buy",
    },
  ];

  const visibleRequirements = requirementList.filter((requirement) => {
    if (requirement.name === "quantity") {
      return listingConfig?.requiresQuantity;
    }

    if (requirement.name === "remainingUpgradeSlots") {
      return listingConfig?.requiresUpgradeSlots;
    }

    return true;
  });

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "500px" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
        <Box
          sx={{ borderBottom: "2px solid", borderColor: "custom.borderBottom" }}
        >
          <Typography>
            {isEditing ? "EDIT LISTING REQUIREMENTS" : "LISTING REQUIREMENTS"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
          {visibleRequirements.map((requirement) => {
            const label =
              requirement.name === "price"
                ? listingConfig?.requiresQuantity
                  ? "Price Per"
                  : "Price"
                : requirement.label;

            if (requirement.type === "select") {
              if (requirement.name === "world") {
                return (
                  <LabeledSelect
                    key={requirement.name}
                    label={label}
                    value={requirements[requirement.name]}
                    options={worldOptions}
                    onChange={(value) =>
                      onRequirementChange(requirement.name, value)
                    }
                    disabled={isEditing}
                  />
                );
              }

              if (requirement.name === "type") {
                return (
                  <LabeledSelect
                    key={requirement.name}
                    label={label}
                    value={requirements[requirement.name]}
                    options={listingTypeOptions}
                    onChange={(value) =>
                      onRequirementChange(requirement.name, value)
                    }
                    disabled={isEditing}
                  />
                );
              }
            }

            if (requirement.type === "numberInput") {
              return (
                <LabeledNumberInput
                  key={requirement.name}
                  label={label}
                  value={requirements[requirement.name]}
                  onChange={(value) =>
                    onRequirementChange(requirement.name, value)
                  }
                />
              );
            }
          })}
        </Box>
        {listingConfig?.requiresStats && (
          <ListingStats
            stats={requirements.stats}
            optionalStats={optionalStats}
            mode="required"
            onChange={onStatsChange}
            isEditing={isEditing}
          />
        )}
        {listingConfig?.requiresStats && (
          <ListingStats
            stats={requirements.stats}
            optionalStats={optionalStats}
            mode="optional"
            onChange={onStatsChange}
            isEditing={isEditing}
          />
        )}
      </Box>
    </Box>
  );
}
