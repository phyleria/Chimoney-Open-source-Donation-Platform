import React, { useState } from "react";
import ProjectTable from "./ProjectTable";
import Modal from "react-modal";
import "../App.css";

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

const AdminView = ({ projects, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const sendFunds = async () => {
    if (selectedProject && email && amount) {
      try {
        const response = await fetch("http://localhost:5000/initiate-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, amount: parseFloat(amount) }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Payment response:", data);
          setProjects(
            projects.map((project) =>
              project.name === selectedProject.name
                ? {
                    ...project,
                    currentAmount: project.currentAmount + parseFloat(amount),
                  }
                : project
            )
          );
          closeModal();
        } else {
          console.error("Failed to initiate payment");
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setAmount("");
    setEmail("");
  };

  const openDetailsModal = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="admin-view">
      <h1>Admin View</h1>
      <ProjectTable
        projects={projects}
        openModal={openModal}
        openDetailsModal={openDetailsModal}
        isAdmin={true}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Send Funds Modal"
        style={customStyles}
      >
        <h2>How much do you want to send?</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            margin: "20px 0",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <h2>Enter recipient email:</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            margin: "20px 0",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendFunds}
          style={{
            backgroundColor: "#670b78",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </Modal>
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

export default AdminView;
