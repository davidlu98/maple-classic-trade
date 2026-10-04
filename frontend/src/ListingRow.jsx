import { useState } from "react";

import Item from "./Item";
import ItemIconDisplay from "./ItemIconDisplay";
import ItemNameDisplay from "./ItemNameDisplay";
import ItemStatDifferencesDisplay from "./ItemStatDifferencesDisplay";
import ItemPriceDisplay from "./ItemPriceDisplay";
import ItemQuantityDisplay from "./ItemQuantityDisplay";
import ListingUpdatedAtDisplay from "./ListingUpdatedAtDisplay";
import UserDisplay from "./UserDisplay";

import {
  Box,
  Button,
  Link,
  Typography,
  Popper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { getStatDifferenceTriangleColor } from "./utils/getStatDifferenceTriangleColor";

export default function ListingRow({
  listing,
  getTimeAgo,
  showActions = false,
  onFulfill,
  onEdit,
  onDelete,
  addEllipses,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const isEquipment = listing.item.category === "Equipment";
  const isCash = listing.item.category === "Cash";

  const { totalUpgradeCount } = listing.item;
  const { remainingUpgradeSlots } = listing;

  const scrollsUsed = isEquipment
    ? totalUpgradeCount - remainingUpgradeSlots
    : 0;

  const totalStatDifference =
    isEquipment && listing
      ? listing.statDifferences.reduce((sum, stat) => sum + stat.value, 0)
      : 0;

  const statDifferenceTriangleColor =
    getStatDifferenceTriangleColor(totalStatDifference);

  const isFulfilled = listing.status === "FULFILLED";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "custom.label",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "custom.borderLightGray",
        px: 1,
        py: 1,
        gap: { xs: 0.5, md: 0 }, // for gap between price/date & view details
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "15% 1fr", md: "10% 1fr" },
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75px",
          }}
        >
          {listing.status === "FULFILLED" ? (
            listing.type === "SELL" ? (
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    bgcolor: "custom.green",
                    px: 0.4,
                    borderRadius: 2,
                    mb: 0.75,
                    mt: 0.25,
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Sold</Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    bgcolor: "custom.green",
                    px: 0.4,
                    borderRadius: 2,
                    mb: 0.75,
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Bought</Typography>
                </Box>
              </Box>
            )
          ) : null}
          <Box
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
            sx={{ display: "inline-block" }}
          >
            <ItemIconDisplay
              iconUrl={listing.item.iconUrl}
              containerSize={50}
              containerColor="custom.label"
              imageSize={38}
              showTriangle={
                isEquipment ? (scrollsUsed > 0 ? true : false) : false
              }
              triangleColor={statDifferenceTriangleColor}
              triangleSize="11px"
              isCash={isCash}
              cashIconDetails={{ width: 13, height: 13, right: 4, bottom: 5 }}
            />

            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="right"
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ]}
              sx={{
                zIndex: 1000,
              }}
            >
              <Item
                item={listing.item}
                listing={listing}
                containerSize="320px"
              />
            </Popper>
          </Box>
        </Box>
        <Box>
          <Box sx={{ minHeight: "21px" }}>
            {isEquipment ? (
              <ItemStatDifferencesDisplay
                statDifferences={listing.statDifferences}
                scrollsUsed={scrollsUsed}
                addEllipses={addEllipses}
              />
            ) : isFulfilled ? null : (
              <ItemQuantityDisplay quantity={listing.quantity} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <ItemNameDisplay
              name={listing.item.name}
              scrollsUsed={scrollsUsed}
              textAlign="left"
              addBold={true}
              addBullet={false}
            />
            <UserDisplay user={listing.user} />
          </Box>
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 26,
              }}
            >
              <ItemPriceDisplay
                price={listing.price}
                isEquipment={isEquipment}
              />
              <Box sx={{ alignSelf: "flex-end" }}>
                <ListingUpdatedAtDisplay
                  updatedAt={listing.updatedAt}
                  getTimeAgo={getTimeAgo}
                />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: 26,
              }}
            >
              <ItemPriceDisplay
                price={listing.price}
                isEquipment={isEquipment}
              />
              <ListingUpdatedAtDisplay
                updatedAt={listing.updatedAt}
                getTimeAgo={getTimeAgo}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: showActions ? "space-between" : "flex-end",
        }}
      >
        {showActions && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "custom.green",
                minWidth: 0,
                px: 0.5,
                py: 0.25,
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
              onClick={() => onFulfill(listing.id)}
            >
              Mark as {listing.type === "SELL" ? "Sold" : "Bought"}
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "custom.blue",
                minWidth: 0,
                px: 0.5,
                py: 0.25,
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
              onClick={() => onEdit(listing.id)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "custom.red",
                minWidth: 0,
                px: 0.5,
                py: 0.25,
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
              onClick={() => onDelete(listing.id)}
            >
              Delete
            </Button>
          </Box>
        )}

        <Link
          href={`/listing/${listing.id}`}
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            fontSize: "15px",
            "&:hover": {
              color: "text.primary",
              textDecoration: "underline",
            },
          }}
        >
          View Details
        </Link>
      </Box>
    </Box>
  );
}
