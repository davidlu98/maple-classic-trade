import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import LabeledSelect from "./LabeledSelect";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const MAX_DETAILS_SIZE = 1000;

export default function ReportListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [reportType, setReportType] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!reportType) {
      setErrorMessage("No report type selected");
      return;
    }

    if (!reportDetails) {
      setErrorMessage("No report details provided");
      return;
    }

    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in");
        return;
      }

      await axios.post(
        `${API_URL}/reports/${listingId}`,
        { reportType, reportDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to report listing",
      );
    }
  };

  const handleReportTypeChange = (value) => {
    setReportType(value);
  };

  const handleReportDetailsChange = (value) => {
    const regex = /^[a-zA-Z0-9,.!'" -:/?&=\r\n]*$/;

    if (value.length <= MAX_DETAILS_SIZE && regex.test(value)) {
      setReportDetails(value);
    }
  };

  const reportTypeOptions = [
    {
      value: "SCAM",
      label: "Scam",
    },
    {
      value: "RMT",
      label: "RMT",
    },
    {
      value: "OTHER",
      label: "Other",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "auto",
        pt: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", md: 500 },
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 16 }}>
              Provide report details and Discord image links to support claims.
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              To copy a Discord image link, follow these steps:
            </Typography>
            <Box
              component="ol"
              sx={{ pl: 3, "& li": { mb: 1, pl: 1, lineHeight: 1.6 } }}
            >
              <li>Screenshot the image.</li>
              <li>Paste the image into any Discord.</li>
              <li>Right click on the image and click "Copy Image Link".</li>
              <li>Paste the image link(s) in the Report Details (Ctrl+V).</li>
            </Box>
          </Box>
          <LabeledSelect
            label="Report Type"
            value={reportType}
            options={reportTypeOptions}
            onChange={handleReportTypeChange}
          />
          <TextField
            label="Report Details"
            variant="outlined"
            multiline
            rows={18}
            fullWidth
            value={reportDetails}
            onChange={(e) => {
              handleReportDetailsChange(e.target.value);
            }}
            sx={{
              bgcolor: "custom.filter",
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: "custom.blue", height: 34 }}
          disabled={!reportDetails || !reportType}
        >
          Submit Report
        </Button>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
