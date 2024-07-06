import React, { useState } from "react";

const NewProjectForm = ({ setProjects, setShowForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      name,
      description,
      lead,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
    };
    console.log("Adding new project: ", newProject);
    setProjects((prevProjects) => {
      console.log("Previous projects: ", prevProjects);
      const updatedProjects = [...prevProjects, newProject];
      console.log("Updated projects: ", updatedProjects);
      return updatedProjects;
    });
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Lead:</label>
        <input
          type="text"
          value={lead}
          onChange={(e) => setLead(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Target Amount:</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Current Amount:</label>
        <input
          type="number"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default NewProjectForm;
