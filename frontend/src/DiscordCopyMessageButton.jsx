import { useState } from "react";

import { Typography, Button } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckIcon from "@mui/icons-material/Check";

export default function DiscordCopyMessageButton({
  listingType,
  discordUsername,
  itemName,
  itemPrice,
  quantity,
  isEquipment,
  listingLink,
  maxWidth = "320px",
}) {
  const [copied, setCopied] = useState(false);

  const fullMessage =
    listingType === "SELL"
      ? isEquipment
        ? `@${discordUsername} Hello there! I would like to buy the "${itemName}" you listed for ${itemPrice} Mesos.\nView item at ${listingLink}`
        : quantity === ""
          ? `@${discordUsername} Hello there! I would like to buy the "${itemName}" you listed for ${itemPrice} Mesos.\n View the item at ${listingLink}`
          : Number(quantity) === 1
            ? `@${discordUsername} Hello there! I would like to buy 1 "${itemName}" you listed for ${itemPrice} Mesos.\n View the item at ${listingLink}`
            : `@${discordUsername} Hello there! I would like to buy ${quantity} "${itemName}" you listed for ${itemPrice} Mesos each for a total of ${quantity * itemPrice} Mesos.\n View the item at ${listingLink}`
      : isEquipment
        ? `@${discordUsername} Hello there! I would like to sell the "${itemName}" you are looking to buy for ${itemPrice} Mesos.\nView item at ${listingLink}`
        : quantity === ""
          ? `@${discordUsername} Hello there! I would like to sell the "${itemName}" you are looking to buy for ${itemPrice} Mesos.\n View the item at ${listingLink}`
          : Number(quantity) === 1
            ? `@${discordUsername} Hello there! I would like to sell 1 "${itemName}" you are looking to buy for ${itemPrice} Mesos.\n View the item at ${listingLink}`
            : `@${discordUsername} Hello there! I would like to sell ${quantity} "${itemName}" you are looking to buy for ${itemPrice} Mesos each for a total of ${quantity * itemPrice} Mesos.\n View the item at ${listingLink}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="outlined"
      onClick={handleCopy}
      title={fullMessage}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: "custom.offwhite",
        width: "100%",
        maxWidth: maxWidth,
        padding: "4px 7px",
        justifyContent: "flex-start",
        textAlign: "left",
      }}
    >
      <Typography
        component="span"
        sx={{
          flex: 1,
          minWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "14px",
        }}
      >
        {fullMessage}
      </Typography>
      {copied ? (
        <CheckIcon sx={{ flexShrink: 0, fontSize: 15, color: "custom.gray" }} />
      ) : (
        <ContentCopyOutlinedIcon
          sx={{ flexShrink: 0, fontSize: 15, color: "custom.gray" }}
        />
      )}
    </Button>
  );
}
