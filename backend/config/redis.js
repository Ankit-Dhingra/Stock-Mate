const dotenv = require("dotenv");
const { createClient } = require('redis'); 
dotenv.config();

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD, 
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redisClient;
