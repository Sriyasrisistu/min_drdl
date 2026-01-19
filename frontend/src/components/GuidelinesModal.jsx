import React from "react";
import "../styles/GuidelinesModal.css";

export default function GuidelinesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/guidelines/Safety_Guidelines.pdf";
    link.download = "Safety_Guidelines.pdf";
    link.click();
  };

  const handleDownloadWord = () => {
    const link = document.createElement("a");
    link.href = "/guidelines/Safety_Guidelines.docx";
    link.download = "Safety_Guidelines.docx";
    link.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Safety Guidelines</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <section className="guideline-section">
            <h3>1. Personal Protective Equipment (PPE)</h3>
            <ul>
              <li>All personnel must wear appropriate PPE based on the hazard level</li>
              <li>Inspect PPE before use for any signs of damage</li>
              <li>Replace damaged or worn-out PPE immediately</li>
              <li>Ensure proper fit and secure fastenings</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h3>2. Work Site Safety</h3>
            <ul>
              <li>Conduct a thorough safety assessment before commencing work</li>
              <li>Mark and cordon off hazardous areas</li>
              <li>Maintain clear communication with all team members</li>
              <li>Keep emergency exits and safety equipment accessible</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h3>3. Hazardous Activities</h3>
            <ul>
              <li>Only trained personnel are authorized to handle hazardous materials</li>
              <li>Follow the prescribed procedures for each hazardous activity</li>
              <li>Do not deviate from approved work plans</li>
              <li>Maintain proper ventilation and environmental controls</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h3>4. Emergency Procedures</h3>
            <ul>
              <li>Know the location of emergency equipment (first aid, fire extinguishers)</li>
              <li>Report all incidents, near-misses, and injuries immediately</li>
              <li>Have emergency contact numbers readily available</li>
              <li>Conduct emergency drills regularly</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h3>5. Documentation and Compliance</h3>
            <ul>
              <li>Maintain accurate records of all safety activities</li>
              <li>Complete all required safety documentation before work begins</li>
              <li>Ensure compliance with organizational safety policies</li>
              <li>Notify the Safety Division telephonically before commencing activity</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h3>6. Supervisor Responsibilities</h3>
            <ul>
              <li>Ensure all team members are trained on safety protocols</li>
              <li>Conduct regular safety briefings</li>
              <li>Monitor compliance with safety guidelines</li>
              <li>Investigate and report all safety incidents</li>
            </ul>
          </section>

          <div className="download-section">
            <p className="download-label">Download Guidelines:</p>
            <div className="download-buttons">
              <button className="download-btn pdf-btn" onClick={handleDownloadPDF}>
                📄 Download PDF
              </button>
              <button className="download-btn word-btn" onClick={handleDownloadWord}>
                📋 Download Word
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
