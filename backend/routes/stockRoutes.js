const express = require("express");
const { getCurrentPrice, getHistoricalPrices} = require("../controllers/stockController");

const router = express.Router();

router.get("/:symbol", getCurrentPrice); 
router.get("/history/:symbol", getHistoricalPrices);


module.exports = router;
