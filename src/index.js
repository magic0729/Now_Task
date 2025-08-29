// Express app entry point
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/formbuilder"
});

// Simple health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

// Dummy auth route
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  // TODO: integrate Firebase
  res.json({ message: `User ${email} registered (stubbed).` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));