
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const roomRoutes = require("./routes/room.routes");
const webhookRoutes = require("./routes/webhook.routes"); 
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payments", paymentRoutes);
app.use(
  "/pdfs",
  express.static(
    path.join(process.cwd(), "public/pdfs")
  )
);
app.use("/webhook", webhookRoutes);;
module.exports = app;

