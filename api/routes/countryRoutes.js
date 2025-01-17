const express = require("express");
const router = express.Router();
const country = require("../controllers/countryController.js");

// Rutas para áreas
router.get("/api/available-countries", country.countriesAvailable);
router.get("/api/country-info/:countryCode", country.countryInfo);

module.exports = router;
