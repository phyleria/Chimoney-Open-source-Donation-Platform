require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/payout", async (req, res) => {
  const { email, valueInUSD, currency } = req.body;

  console.log("Received payout request:", { email, valueInUSD, currency });

  const apiBaseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.CHIMONEY_API_KEY;

  if (!apiBaseUrl || !apiKey) {
    return res.status(500).json({
      status: "error",
      message: "API_BASE_URL or CHIMONEY_API_KEY is not defined in environment variables",
    });
  }

  const options = {
    method: 'POST',
    url: `${apiBaseUrl}/v0.2/payouts/chimoney`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': apiKey
    },
    data: {
      chimoneys: [{ email, valueInUSD, currency }]
    }
  };

  try {
    const response = await axios.request(options);
    console.log("Payout response from Chimoney API:", response.data);
    res.json({ status: "success", data: response.data });
  } catch (error) {
    console.error("Error during payout:", error.response ? error.response.data : error.message);
    res.status(500).json({
      status: "error",
      message: "Error when trying to payout",
      error: error.message,
      stack: error.stack,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

