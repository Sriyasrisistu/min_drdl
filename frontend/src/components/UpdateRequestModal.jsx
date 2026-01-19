import React, { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import "../styles/UpdateRequestModal.css";

export default function UpdateRequestModal({ isOpen, request, onClose, onUpdate }) {
  const [formData, setFormData] = useState(request || {});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (request) {
      setFormData(request);
      setMessage("");
    }
  }, [request, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updatedRequest = await ApiService.updateRequest(formData.requestId, formData);
      setMessage("✓ Request updated successfully!");
      
      setTimeout(() => {
        onUpdate(updatedRequest);
        onClose();
      }, 1000);
    } catch (error) {
      setMessage(`✗ Error: ${error.message || "Update failed"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !request) return null;

  return (
    <div className="modal-overlay-update" onClick={onClose}>
      <div className="modal-content-update" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-update">
          <h2>Update Safety Request</h2>
          <button className="close-btn-update" onClick={onClose}>✕</button>
        </div>

        {message && (
          <div className={`message-update ${message.includes("Error") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-section-update">
            <div className="form-row-update">
              <div className="form-group-update">
                <label>Request ID (Read-Only)</label>
                <input
                  type="text"
                  value={formData.uniqueId || ""}
                  disabled
                  className="form-input-readonly"
                />
              </div>
              <div className="form-group-update">
                <label>Personnel Number (Read-Only)</label>
                <input
                  type="text"
                  value={formData.personnelNumber || ""}
                  disabled
                  className="form-input-readonly"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Date of Request (Read-Only)</label>
                <input
                  type="text"
                  value={formData.dateOfRequest || ""}
                  disabled
                  className="form-input-readonly"
                />
              </div>
              <div className="form-group-update">
                <label>Safety Coverage</label>
                <input
                  type="text"
                  name="safetyCoverage"
                  value={formData.safetyCoverage || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Directorate</label>
                <input
                  type="text"
                  name="directorate"
                  value={formData.directorate || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
              <div className="form-group-update">
                <label>Division</label>
                <input
                  type="text"
                  name="division"
                  value={formData.division || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Article Details</label>
                <textarea
                  name="articleDetails"
                  value={formData.articleDetails || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Work Description</label>
                <textarea
                  name="workDescription"
                  value={formData.workDescription || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Test Bed</label>
                <input
                  type="text"
                  name="testBed"
                  value={formData.testBed || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
              <div className="form-group-update">
                <label>Test Controller Name</label>
                <input
                  type="text"
                  name="testControllerName"
                  value={formData.testControllerName || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Test Controller Designation</label>
                <input
                  type="text"
                  name="testControllerDesignation"
                  value={formData.testControllerDesignation || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
              <div className="form-group-update">
                <label>TARB Clearance</label>
                <input
                  type="text"
                  name="tarbClearance"
                  value={formData.tarbClearance || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Reference No.</label>
                <input
                  type="text"
                  name="referenceNo"
                  value={formData.referenceNo || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
              <div className="form-group-update">
                <label>Work Centre</label>
                <input
                  type="text"
                  name="workCentre"
                  value={formData.workCentre || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Activity Schedule</label>
                <input
                  type="text"
                  name="activitySchedule"
                  value={formData.activitySchedule || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
              <div className="form-group-update">
                <label>Ambulance Required</label>
                <input
                  type="text"
                  name="ambulanceRequired"
                  value={formData.ambulanceRequired || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                />
              </div>
            </div>

            <div className="form-row-update">
              <div className="form-group-update">
                <label>Other Details</label>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails || ""}
                  onChange={handleInputChange}
                  className="form-input-update"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer-update">
            <button 
              type="button" 
              className="btn-cancel-update" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-save-update" 
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
