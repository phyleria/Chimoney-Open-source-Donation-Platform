import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function HomePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    if (!email || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://api-v2-sandbox.chimoney.io/v0.2/payment/initiate',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': '3a9331bb0ed50f637f92e6f710ee57f6d739424f5fe014f7cdc7364f727a5158'
      },
      data: {
        payerEmail: email,  
        valueInUSD: parseFloat(amount),
        redirect_url: `${window.location.origin}/thank-you`  
      }
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          const paymentLink = response.data.data.paymentLink;
          window.location.href = paymentLink;
        } else {
          alert("Failed to initiate payment");
        }
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
        alert("An error occurred while initiating the payment");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <h1>ChiPlatform</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">Who We Are</a>
            <a href="#">Project</a>
            <a href="#">Gallery</a>
            <a href="#">News & Events</a>
            <Link to="/SignUp">Register</Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero">
          <h2>Support Global Open-source Community Projects</h2>
          <div className="donate-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="donate-button" onClick={handleDonate}>
              Donate Now
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/osca/image/upload/w_auto,dpr_auto,q_30,f_auto/v1625665665/osca-website//backgrounds/community/wyjgycv2yhnmuu2dgbmi"
            alt="Children"
            className="hero-image"
          />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
