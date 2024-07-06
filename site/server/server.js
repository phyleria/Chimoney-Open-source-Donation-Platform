const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

const initiatePayment = async (email, amount, retries = 3, delay = 1000) => {
  const options = {
    method: "POST",
    url: "https://api-v2-sandbox.chimoney.io/v0.2/payment/initiate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": process.env.CHIMONEY_API_KEY,
    },
    data: {
      payerEmail: email,
      valueInUSD: amount,
      redirect_url: "http://localhost:3001/",
    },
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        `Error initiating payment (attempt ${i + 1}): ${error.message}`
      );
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
};

const initiatePayout = async (email, amount, retries = 3, delay = 1000) => {
  const options = {
    method: "POST",
    url: "https://api-v2-sandbox.chimoney.io/v0.2/payouts/chimoney",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": process.env.CHIMONEY_API_KEY,
    },
    data: {
      chimoneys: [
        {
          email: email,
          valueInUSD: amount,
        },
      ],
    },
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(
        `Error initiating payout (attempt ${i + 1}): ${error.message}`
      );
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
};

app.post("/initiate-payment", async (req, res) => {
  const { email, amount, payout } = req.body;
  console.log(
    `Received payment initiation request for email: ${email}, amount: ${amount}, payout: ${payout}`
  );

  try {
    const paymentResponse = payout
      ? await initiatePayout(email, amount)
      : await initiatePayment(email, amount);

    console.log("Payment response:", paymentResponse);

    if (paymentResponse.paymentLink) {
      res.json({ paymentLink: paymentResponse.paymentLink });
    } else {
      res.status(500).json({ error: "Failed to generate payment link" });
    }
  } catch (error) {
    console.error(
      "Failed to initiate payment after multiple attempts:",
      error.message
    );
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
