import { Box, Typography } from "@mui/material";

const JOBS = ["BEGINNER", "WARRIOR", "MAGE", "BOWMAN", "THIEF"];

export default function ItemRequiredJobs({
  reqJobs = [],
  variant = "default",
}) {
  const isAllJobs = reqJobs.includes("ALL");

  const isRequired = (job) => isAllJobs || reqJobs.includes(job);

  if (variant === "preview") {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {JOBS.slice(0, 3).map((job) => (
            <Typography
              key={job}
              sx={{
                color: isRequired(job) ? "text.primary" : "text.disabled",
                fontSize: "12px",
              }}
            >
              {job}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {JOBS.slice(3).map((job) => (
            <Typography
              key={job}
              sx={{
                color: isRequired(job) ? "text.primary" : "text.disabled",
                fontSize: "10px",
              }}
            >
              {job}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      {JOBS.map((job) => {
        return (
          <Typography
            key={job}
            sx={{
              color: isRequired(job) ? "text.primary" : "text.disabled",
              fontSize: "12px",
            }}
          >
            {job}
          </Typography>
        );
      })}
    </Box>
  );
}
