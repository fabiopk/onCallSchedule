import express from "express";
import connectDB from "./config/db.js";

import userRoutes from "./routes/api/users.js";
import authRoutes from "./routes/api/auth.js";
import eventRoutes from "./routes/api/events.js";

const app = express();

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
