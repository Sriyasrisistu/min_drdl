import React, { useState } from "react";
import ApiService from "../services/apiService";
import "../styles/SafetyFireRequestForm.css";
import IntegrationSection from "./IntegrationSection";
import StaticTestSection from "./StaticTestSection";
import TransportationSection from "./TransportationSection";

export default function SafetyFireRequestForm() {
  const [coverageType, setCoverageType] = useState("");
  const [formData, setFormData] = useState({
    personnelNumber: "",
    safetyCoverage: "",
    directorate: "DRDL",
    division: "Engineering",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCoverageChange = (e) => {
    setCoverageType(e.target.value);
    setFormData({ ...formData, safetyCoverage: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await ApiService.createRequest(formData);
      setMessage("✓ Request submitted successfully! ID: " + response.requestId);
      console.log("Response:", response);
      setFormData({
        personnelNumber: "",
        safetyCoverage: "",
        directorate: "DRDL",
        division: "Engineering",
      });
      setCoverageType("");
    } catch (error) {
      setMessage(`✗ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="safety-form-container">
      <h1 className="form-title">SAFETY FIRE REQUEST FORM</h1>
      
      {message && (
        <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* TYPE OF SAFETY COVERAGE */}
        <div className="form-section">
          <label className="form-label">Type of Safety Coverage *</label>
          <select
            className="form-select"
            value={coverageType}
            onChange={handleCoverageChange}
            required
          >
            <option value="">Select Type</option>
            <option value="integration">INTEGRATION</option>
            <option value="static">STATIC TEST</option>
            <option value="thermostructural">THERMOSTRUCTURAL</option>
            <option value="pressure">PRESSURE TEST</option>
            <option value="grt">GRT</option>
            <option value="alignment">ALIGNMENT INSPECTION</option>
            <option value="radiography">RADIOGRAPHY</option>
            <option value="hydrobasin">HYDROBASIN</option>
            <option value="transportation">TRANSPORTATION</option>
            <option value="other">ANY OTHER (Specify)</option>
          </select>
        </div>

        {/* PERSONNEL NUMBER */}
        <div className="form-section">
          <label className="form-label">Personnel Number *</label>
          <input
            type="text"
            name="personnelNumber"
            className="form-input"
            placeholder="Enter Personnel Number"
            value={formData.personnelNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Render section based on coverage type */}
        {coverageType === "integration" && (
          <IntegrationSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "static" && (
          <StaticTestSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "transportation" && (
          <TransportationSection formData={formData} handleInputChange={handleInputChange} />
        )}

        {/* BUTTONS */}
        <div className="button-group">
          <button type="button" className="btn save-btn" disabled={loading}>
            SAVE
          </button>
          <button type="submit" className="btn send-btn" disabled={loading}>
            {loading ? "SUBMITTING..." : "SEND TO HEAD, SFEED"}
          </button>
        </div>
      </form>
    </div>
  );
}