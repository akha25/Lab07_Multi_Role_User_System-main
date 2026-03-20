require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = new Set(["http://localhost:5173", "http://127.0.0.1:5173"]);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

// Original routes
app.get("/", (req, res) =>
  res.send("Lab 06: Backend running and GitHub push successful")
);
app.get("/about", (req, res) => {
  res.send("Name: Nikita Rani | Enrollment: CS-23411267 | Section: 3CSE15");
});
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
