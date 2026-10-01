import ItemNameDisplay from "./ItemNameDisplay";
import ItemIconDisplay from "./ItemIconDisplay";
import ItemRequiredStats from "./ItemRequiredStats";
import ItemRequiredJobs from "./ItemRequiredJobs";
import ItemBaseDetails from "./ItemBaseDetails";
import ItemListingDetails from "./ItemListingDetails";
import ItemDescriptionDisplay from "./ItemDescriptionDisplay";
import ItemPriceDisplay from "./ItemPriceDisplay";

import { getStatDifferenceTextColor } from "./utils/getStatDifferenceTextColor";
import { getStatDifferenceTriangleColor } from "./utils/getStatDifferenceTriangleColor";

import { Box } from "@mui/material";

export default function Item({
  item,
  listing = null,
  containerSize = "360px",
  descriptionFontSize = "12px",
  priceFontSize = "14px",
}) {
  if (!item)
    return (
      <Box
        sx={{
          width: containerSize,
          height: "200px",
          border: "1px solid",
          borderColor: "custom.borderBottom",
        }}
      ></Box>
    );

  const isEquipment = item.category === "Equipment";

  const scrollsUsed =
    isEquipment && listing
      ? item.totalUpgradeCount - listing.remainingUpgradeSlots
      : 0;

  const totalStatDifference =
    isEquipment && listing
      ? listing.statDifferences.reduce((sum, stat) => sum + stat.value, 0)
      : 0;

  const statDifferenceTextColor = getStatDifferenceTextColor(
    totalStatDifference,
    scrollsUsed,
  );

  const statDifferenceTriangleColor =
    getStatDifferenceTriangleColor(totalStatDifference);

  return (
    <Box
      sx={{
        bgcolor: "custom.purple",
        display: "flex",
        flexDirection: "column",
        width: containerSize,
        p: 1,
        gap: 0.5,
      }}
    >
      <ItemNameDisplay
        name={item.name}
        scrollsUsed={scrollsUsed}
        totalStatDifference={totalStatDifference}
        isEquipment={isEquipment}
        statDifferenceColor={statDifferenceTextColor}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 1,
        }}
      >
        <ItemIconDisplay
          iconUrl={item.iconUrl}
          showTriangle={isEquipment ? (scrollsUsed > 0 ? true : false) : false}
          triangleColor={statDifferenceTriangleColor}
        />
        {isEquipment ? (
          <ItemRequiredStats item={item} />
        ) : (
          <ItemDescriptionDisplay
            description={item.description}
            fontSize={descriptionFontSize}
          />
        )}
      </Box>

      {isEquipment && (
        <>
          <Box sx={{ alignSelf: "center" }}>
            <ItemRequiredJobs
              reqJobs={item.reqJobs}
              variant={listing ? "default" : "default"}
            />
          </Box>

          {listing ? (
            <ItemListingDetails
              item={item}
              listingStats={listing.stats}
              remainingUpgradeSlots={listing.remainingUpgradeSlots}
            />
          ) : (
            <ItemBaseDetails item={item} />
          )}
        </>
      )}

      <Box
        sx={{
          alignSelf: "end",
        }}
      >
        <ItemPriceDisplay
          price={item.storeSellPrice}
          fontSize={priceFontSize}
          isListing={true}
        />
      </Box>
    </Box>
  );
}
