import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import "@fontsource/inter";
import "@fontsource/space-grotesk";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  // // Remove comment to test production
  // <BrowserRouter>
  //   <ThemeProvider theme={theme}>
  //     <App />
  //   </ThemeProvider>
  // </BrowserRouter>,
);
