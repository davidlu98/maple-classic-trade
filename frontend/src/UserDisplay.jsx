import { Box, Typography, Avatar, Link } from "@mui/material";

export default function UserDisplay({ user }) {
  return (
    <Link
      href={`/user/${user.id}`}
      color="inherit"
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          height: 20,
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>{user.username}</Typography>
        <Avatar src={user.avatar} alt="" sx={{ width: 30, height: 30 }} />
      </Box>
    </Link>
  );
}
