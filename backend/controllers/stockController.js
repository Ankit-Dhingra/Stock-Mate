const Stock = require("../models/Stock");
const redisClient = require("../config/redis");


const mockData = {
  AAPL: 150.25,
  GOOGL: 2800.55,
  AMZN: 3700.25,
};

const getCurrentPrice = async (req, res) => {
  const { symbol } = req.params;

  try {
    const cachedPrice = await redisClient.get(symbol);
    if (cachedPrice) {
      return res.status(200).json({ symbol, price: Number(cachedPrice), source: "Redis Cache" });
    }

    const price = mockData[symbol];
    if (!price) {
      return res.status(404).json({ message: "Stock not found" });
    }

    await redisClient.set(symbol, price, { EX: 60 }); 

    res.status(200).json({ symbol, price, source: "Mock Data" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getHistoricalPrices = async (req, res) => {
  const { symbol } = req.params;

  try {
    const history = await Stock.find({ symbol }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getCurrentPrice, getHistoricalPrices};
