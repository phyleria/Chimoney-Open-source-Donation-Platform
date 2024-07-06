import React from "react";
import "../App.css";

const ProjectTable = ({ projects, openModal, openDetailsModal }) => {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Lead</th>
          <th>Target Amount</th>
          <th>Current Amount</th>
          <th>Details</th>
          {openModal && <th>Payout</th>}
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.name}>
            <td>{project.name}</td>
            <td>{project.lead}</td>
            <td>{project.targetAmount}</td>
            <td>{project.currentAmount}</td>
            <td>
              <button
                className="details-button"
                onClick={() => openDetailsModal(project)}
              >
                Details
              </button>
            </td>
            {openModal && (
              <td>
                <button
                  className="send-funds-button"
                  onClick={() => openModal(project)}
                >
                  Send Funds
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
