import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    // Application's main accent (brand/action color)
    // Example: In <Button variant="contained"/>, it will use theme.palette.primary.main
    primary: {
      main: "#18181b",
    },

    error: {
      main: "#ef4444",
    },

    background: {
      default: "#18181b", // application's main/default bg color
      paper: "#27272a", // surfaces sitting on top of main bg like cards, dialogs, menus, panels, popovers, drawers
    },

    // Primary: normal & most important
    text: {
      primary: "#ffffff", // normal & most important text
      secondary: "#a1a1aa", // less important, supporting text; usually gray-ish
      disabled: "#71717a", // something disabled or unavailable
    },

    custom: {
      purple: "#47476f",
      offwhite: "#c1c1cd",
      blue: "#1d4ed8",
      green: "#15803d",
      red: "#b91c1c",
      dark: "#121212",
      gray: "#999",
      label: "#0e0f10",
      filter: "#1e2124",
      borderBottom: "#465260",
      borderLeft: "#634928",
      borderLightGray: "#4a4b4f",
      darkGray: "#232326",
      discord: "#5865F2",
    },

    input: {
      // default: "#121212",
      default: "#1e2124",
    },
  },

  typography: {
    fontFamily: '"Inter", sans-serif',

    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.5px",
    },

    button: {
      textTransform: "none",
    },
  },
});

export default theme;
