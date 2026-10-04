import { Box, Skeleton } from "@mui/material";

export default function ItemIconDisplay({
  iconUrl,
  containerSize = 90,
  containerColor = "custom.offwhite",
  imageSize = 64,
  showTriangle = false,
  triangleColor,
  triangleSize = "20px",
  isCash = false,
  cashIconDetails = { width: 24, height: 24, right: 10, bottom: 10 },
}) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: containerColor,
        width: containerSize,
        height: containerSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: "custom.borderLeft",
        overflow: "hidden",
      }}
    >
      {showTriangle && (
        <Box
          sx={{
            position: "absolute",
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            borderTop: `${triangleSize} solid`,
            borderTopColor: triangleColor,
            borderRight: `${triangleSize} solid transparent`,
          }}
        />
      )}

      {iconUrl ? (
        <Box
          component="img"
          src={iconUrl}
          alt=""
          sx={{
            width: imageSize,
            height: imageSize,
            objectFit: "contain",
            imageRendering: "pixelated",
          }}
        />
      ) : (
        <Skeleton variant="rectangular" width={imageSize} height={imageSize} />
      )}

      {isCash && (
        <Box
          component="img"
          src="/cash_icon.png"
          alt=""
          sx={{
            position: "absolute",
            width: cashIconDetails.width,
            height: cashIconDetails.height,
            right: cashIconDetails.right,
            bottom: cashIconDetails.bottom,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      )}
    </Box>
  );
}
