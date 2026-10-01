import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";

const linkSx = {
  color: "text.secondary",
  fontSize: "14px",
  "&:hover": {
    color: "text.primary",
    textDecoration: "underline",
  },
};

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Link component={RouterLink} to="/help" underline="none" sx={linkSx}>
          Help
        </Link>
        <Link component={RouterLink} to="/about" underline="none" sx={linkSx}>
          About
        </Link>
        <Link component={RouterLink} to="/privacy" underline="none" sx={linkSx}>
          Privacy
        </Link>
        <Link component={RouterLink} to="/terms" underline="none" sx={linkSx}>
          Terms
        </Link>
        <Link
          component={RouterLink}
          to="/feedback"
          underline="none"
          sx={linkSx}
        >
          Feedback
        </Link>
        <Link
          component={RouterLink}
          to="https://ko-fi.com/fivetoni"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={linkSx}
        >
          Support
        </Link>
        {/* <Typography sx={{ color: "text.disabled", fontSize: "14px" }}>
          © {new Date().getFullYear()} MapleClassicTrade
        </Typography> */}
      </Box>
    </Box>
  );
}
