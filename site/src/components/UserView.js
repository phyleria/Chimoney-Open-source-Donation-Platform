import React, { useState, Suspense } from "react";
import ProjectTable from "./ProjectTable";
import Modal from "react-modal";
import "../App.css";

const NewProjectForm = React.lazy(() => import("./NewProjectForm"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    maxHeight: "80vh",
    maxWidth: "50vw",
  },
};

const UserView = ({ projects, setProjects }) => {
  const [showForm, setShowForm] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openDetailsModal = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="user-view">
      <h1 style={{ textAlign: "center" }}>User View</h1>

      {showForm && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewProjectForm setProjects={setProjects} setShowForm={setShowForm} />
        </Suspense>
      )}
      <ProjectTable projects={projects} openDetailsModal={openDetailsModal} />
      <div className="button-container">
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-project-button"
        >
          + Add New Project
        </button>
      </div>
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={closeDetailsModal}
        contentLabel="Project Details Modal"
        style={customStyles}
      >
        {selectedProject && (
          <div style={{ textAlign: "left" }}>
            <h2>{selectedProject.name}</h2>
            <p>Lead: {selectedProject.lead}</p>
            <p>Target Amount: {selectedProject.targetAmount}</p>
            <p>Current Amount: {selectedProject.currentAmount}</p>
            <p>Details: {selectedProject.details}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserView;
