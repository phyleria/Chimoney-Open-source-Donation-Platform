import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import ThankYou from "./ThankYou";


function App() {
  const [projects, setProjects] = useState([
    {
      name: "React.js Enhancement",
      description: "Enhancing React.js",
      lead: "John Doe",
      targetAmount: 50000,
      currentAmount: 25000,
      details:
        "The React.js Enhancement project, led by John Doe, aims to optimize the performance and usability of the React.js library. With a target amount of $50,000 and a current amount of $25,000, the project focuses on improving state management, debugging tools, and documentation. By engaging the community through webinars and workshops, it seeks to gather feedback and ensure the enhancements meet developers' needs.",
    },
    {
      name: "Open Source CRM",
      description: "Open Source CRM system",
      lead: "Jane Smith",
      targetAmount: 100000,
      currentAmount: 60000,
      details:
        "The Open Source CRM project, led by Jane Smith, seeks to develop a robust, customizable customer relationship management system. With a target amount of $100,000 and a current amount of $60,000, this project aims to provide businesses with an accessible tool for managing customer interactions, sales pipelines, and marketing campaigns. The project will focus on integrating AI-driven insights, user-friendly interfaces, and seamless third-party integrations to enhance overall business productivity and customer satisfaction.",
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/thank-you" element={<ThankYou />} />

        
       
      </Routes>
    </Router>
  );
}

export default App;
