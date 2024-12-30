const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

let siteStatus = {
  url: 'https://zroot.it/',
  isOnline: false,
  lastChecked: null,
};

// Tarkistaa sivuston tilan
const checkSiteStatus = async () => {
  try {
    const response = await axios.get(siteStatus.url);
    siteStatus.isOnline = response.status === 200;
    siteStatus.lastChecked = new Date().toISOString();
  } catch (error) {
    siteStatus.isOnline = false;
    siteStatus.lastChecked = new Date().toISOString();
  }
};

// Käynnistää tilan tarkistuksen joka 5 sekunnin välein
setInterval(checkSiteStatus, 5000);

// API-päätepiste sivuston tilan tarkistamiseen
app.get('/status', (req, res) => {
  res.json(siteStatus);
});

// Käynnistää palvelimen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
