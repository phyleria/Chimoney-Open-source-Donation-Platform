import React from "react";
import { Link } from "react-router-dom";

const Projects = ({ projects }) => {
  return (
    <div>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Project Lead</th>
            <th>Target Funding Amount</th>
            <th>Current Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.lead}</td>
              <td>{project.targetAmount}</td>
              <td>{project.currentAmount}</td>
              <td>
                <Link to={`/projects/${project.name}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
