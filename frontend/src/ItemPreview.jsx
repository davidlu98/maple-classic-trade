import { Box } from "@mui/material";
import ItemNameDisplay from "./ItemNameDisplay";
import ItemIconDisplay from "./ItemIconDisplay";
import ItemRequiredStats from "./ItemRequiredStats";
import ItemRequiredJobs from "./ItemRequiredJobs";
import ItemListingDetails from "./ItemListingDetails";
import ItemDescriptionDisplay from "./ItemDescriptionDisplay";
import ItemPriceDisplay from "./ItemPriceDisplay";

export default function ItemPreview({ listing }) {
  if (!listing?.item) return null;

  const { item } = listing;
  const isEquipment = item.category === "Equipment";

  const scrollsUsed = isEquipment
    ? item.totalUpgradeCount - listing.remainingUpgradeSlots
    : 0;

  return (
    <Box
      sx={{
        bgcolor: "custom.purple",
        display: "flex",
        flexDirection: "column",
        width: "250px",
        p: 1,
        gap: 0.5,
      }}
    >
      <ItemNameDisplay name={item.name} scrollsUsed={scrollsUsed} />

      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 1 }}>
        <ItemIconDisplay iconUrl={item.iconUrl} />
        {isEquipment ? (
          <ItemRequiredStats item={item} />
        ) : (
          <ItemDescriptionDisplay description={item.description} />
        )}
      </Box>

      {isEquipment && (
        <>
          <Box sx={{ alignSelf: "center" }}>
            <ItemRequiredJobs reqJobs={item.reqJobs} variant="preview" />
          </Box>
          <ItemListingDetails
            item={item}
            listingStats={listing.stats}
            remainingUpgradeSlots={listing.remainingUpgradeSlots}
          />
        </>
      )}

      <Box
        sx={{
          alignSelf: "end",
        }}
      >
        <ItemPriceDisplay
          price={item.storeSellPrice}
          fontSize="11px"
          isListing={true}
        />
      </Box>
    </Box>
  );
}
