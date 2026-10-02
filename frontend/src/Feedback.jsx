import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const MAX_FEEDBACK_SIZE = 1000;

export default function Feedback() {
  const navigate = useNavigate();

  const [feedbackDetails, setFeedbackDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!feedbackDetails) {
      setErrorMessage("No feedback details provided");
      return;
    }

    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in");
        return;
      }

      await axios.post(
        `${API_URL}/feedback/`,
        { feedbackDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to submit feedback",
      );
    }
  };

  const handleFeedbackDetailsChange = (value) => {
    const regex = /^[a-zA-Z0-9,.!'" :/?&=\r\n]*$/;

    if (value.length <= MAX_FEEDBACK_SIZE && regex.test(value)) {
      setFeedbackDetails(value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
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
            width: "500px",
          }}
        >
          <Box>
            <Typography>
              Please provide any feedback you have for the website here.
            </Typography>
            <Typography>You can submit feedback once a day.</Typography>
          </Box>

          <TextField
            label="Feedback Details"
            variant="outlined"
            multiline
            rows={15}
            fullWidth
            value={feedbackDetails}
            onChange={(e) => {
              handleFeedbackDetailsChange(e.target.value);
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
          disabled={!feedbackDetails}
        >
          Submit Feedback
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
