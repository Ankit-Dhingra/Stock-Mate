const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const stockRoutes = require("./routes/stockRoutes");
const cors = require('cors');

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());


connectDB();
redisClient.connect();


app.use("/api/stocks", stockRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
