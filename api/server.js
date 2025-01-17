// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = process.env;
// const https = require("https");
const app = express();
// Middlewares
console.log(process.env.PORT);

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
const countryRoutes = require("./routes/countryRoutes.js");

//server
app.use("/", countryRoutes);

// Start server

app.listen(PORT || 3001, () => {
  console.log(`Server running on port ${PORT || 3001}`);
});
