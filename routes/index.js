const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.post("/weather-details", homeController.weather);
router.get("/weather-details", homeController.weatherget);

module.exports = router;