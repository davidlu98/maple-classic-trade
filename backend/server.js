require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173", // Local frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const itemsRoutes = require("./routes/items");
const worldsRoutes = require("./routes/worlds");
const listingsRoutes = require("./routes/listings");
const userRoutes = require("./routes/user");
const reportsRoutes = require("./routes/reports");
const feedbackRoutes = require("./routes/feedback");

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/items", itemsRoutes);
app.use("/worlds", worldsRoutes);
app.use("/listings", listingsRoutes);
app.use("/user", userRoutes);
app.use("/reports", reportsRoutes);
app.use("/feedback", feedbackRoutes);

// Error-handling
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    error:
      status >= 500
        ? "Internal Server Error"
        : err.message || "Something went wrong",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
