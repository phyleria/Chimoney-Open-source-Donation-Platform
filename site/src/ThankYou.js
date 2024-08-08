import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <Confetti />
      <h1>Thank you for donating to Open Source Projects!</h1>
      <div className="checkmark">&#10004;</div>
      <Link to="/" className="back-home-link">Back to Home</Link>
    </div>
  );
};

export default ThankYou;
