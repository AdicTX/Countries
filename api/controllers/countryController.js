const axios = require("axios");

const countriesAvailable = async (req, res) => {
  try {
    const response = await axios.get("https://date.nager.at/api/v3/AvailableCountries");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching available countries:", error.message);
    res.status(500).json({ error: "Failed to fetch available countries." });
  }
};
const countryInfo = async (req, res) => {
  const { countryCode } = req.params;

  try {
    // Fetch country info (general country details)
    const countryInfoResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );

    const commonName = countryInfoResponse.data.commonName || null;
    const officialName = countryInfoResponse.data.officialName || null;
    const borderCountries = countryInfoResponse.data.borders || [];

    // Fetch population data
    let populationData = null;
    try {
      const populationResponse = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/population",
        { country: commonName }
      );
      populationData = populationResponse.data.data.populationCounts || null;
    } catch (populationError) {
      console.error("Error fetching population data:", populationError.message);
    }

    // Fetch flag URL
    let flagUrl = null;
    try {
      const flagResponse = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/flag/images",
        { country: commonName }
      );
      flagUrl = flagResponse.data.data.flag || null;
    } catch (flagError) {
      console.error("Error fetching flag URL:", flagError.message);
    }

    // Consolidate data and send response
    const result = {
      commonName: commonName,
      officialName: officialName,
      borders: borderCountries,
      populationData: populationData,
      flagUrl: flagUrl,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching country info:", error.message);
    res.status(500).json({ error: "Failed to fetch country information." });
  }
};

module.exports = { countriesAvailable, countryInfo };
