const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("API is working !!!");
});

module.exports = app;
