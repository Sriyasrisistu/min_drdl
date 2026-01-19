import React, { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import "../styles/SafetyFireRequestForm.css";

import IntegrationSection from "./IntegrationSection";
import StaticTestSection from "./StaticTestSection";
import ThermostructuralSection from "./ThermostructuralSection";
import PressureTestSection from "./PressureTestSection";
import GRTSection from "./GRTSection";
import AlignmentInspectionSection from "./AlignmentInspectionSection";
import RadiographySection from "./RadiographySection";
import HydrobasinSection from "./HydrobasinSection";
import TransportationSection from "./TransportationSection";
import OtherSection from "./OtherSection";
import GuidelinesModal from "./GuidelinesModal";
import RequestsTable from "./RequestsTable";
import RequestDetailsPrint from "./RequestDetailsPrint";
import LoginForm from "./LoginForm";

export default function SafetyFireRequestForm() {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [coverageType, setCoverageType] = useState("");
  const [formData, setFormData] = useState({
    personnelNumber: "",
    safetyCoverage: "",
    directorate: "DRDL",
    division: "Engineering",
    activityInchargeName: "",
    activityInchargeOrg: "",
    activityInchargePhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [declared, setDeclared] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch employees for Activity Incharge dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await ApiService.getAllEmployees();
        setEmployees(response);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Set personnel number when logged in
  useEffect(() => {
    if (loggedInEmployee) {
      setFormData(prev => ({
        ...prev,
        personnelNumber: loggedInEmployee.personnelNo
      }));
    }
  }, [loggedInEmployee]);

  const handleLoginSuccess = (employee) => {
    setLoggedInEmployee(employee);
  };

  const handleLogout = () => {
    setLoggedInEmployee(null);
    setFormData({
      personnelNumber: "",
      safetyCoverage: "",
      directorate: "DRDL",
      division: "Engineering",
      activityInchargeName: "",
      activityInchargeOrg: "",
      activityInchargePhone: "",
    });
    setCoverageType("");
    setDeclared(false);
    setSelectedRequest(null);
  };

  const handleCoverageChange = (e) => {
    const value = e.target.value;
    setCoverageType(value);
    setFormData({ ...formData, safetyCoverage: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Activity Incharge selection now handled inside IntegrationSection when relevant

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.personnelNumber || !formData.safetyCoverage) {
      setMessage("✗ Error: Personnel Number and Safety Coverage are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await ApiService.createRequest(formData);
      setMessage("✓ Request saved successfully! ID: " + response.uniqueId);
      console.log("Saved Response:", response);
      
      // Reset form
      setFormData({
        personnelNumber: loggedInEmployee.personnelNo,
        safetyCoverage: "",
        directorate: "DRDL",
        division: "Engineering",
        activityInchargeName: "",
        activityInchargeOrg: "",
        activityInchargePhone: "",
      });
      setCoverageType("");
      setDeclared(false);
      setSelectedRequest(null);
      
      // Refresh the table
      setRefreshTable(refreshTable + 1);
    } catch (error) {
      setMessage(`✗ Error: ${error.message || "Save failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!declared) {
      setMessage("✗ Error: You must accept the safety declaration");
      return;
    }

    if (!formData.personnelNumber || !formData.safetyCoverage) {
      setMessage("✗ Error: Personnel Number and Safety Coverage are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await ApiService.createRequest(formData);
      setMessage("✓ Request submitted successfully! ID: " + response.requestId);
      console.log("Response:", response);

      // Reset form
      setFormData({
        personnelNumber: loggedInEmployee.personnelNo,
        safetyCoverage: "",
        directorate: "DRDL",
        division: "Engineering",
        activityInchargeName: "",
        activityInchargeOrg: "",
        activityInchargePhone: "",
      });
      setCoverageType("");
      setDeclared(false);
      setSelectedRequest(null);
    } catch (error) {
      setMessage(`✗ Error: ${error.message || "Submission failed"}`);
    } finally {
      setLoading(false);
    }
  };

  // If not logged in, show login form
  if (!loggedInEmployee) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="safety-form-container">
      <div className="form-header">
        <div className="header-title">
          <h1 className="form-title">SAFETY & FIRE COVERAGE REQUEST FORM</h1>
          <p className="form-subtitle">Defence Research and Development Laboratory</p>
        </div>
        <div className="user-info">
          <p><strong>👤 {loggedInEmployee.employeeName}</strong></p>
          <p className="emp-details">{loggedInEmployee.designation}</p>
          <p className="emp-details">{loggedInEmployee.directorate}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

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

        {/* Activity Incharge select removed from top of form as requested. */}

        {/* Activity Incharge details are intentionally hidden from the form UI.
            Values are still stored internally when an employee is selected. */}

        {/* Render section based on coverage type */}
        {coverageType === "integration" && (
          <IntegrationSection
            formData={formData}
            handleInputChange={handleInputChange}
            employees={employees}
          />
        )}
        {coverageType === "static" && (
          <StaticTestSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "thermostructural" && (
          <ThermostructuralSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "pressure" && (
          <PressureTestSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "grt" && (
          <GRTSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "alignment" && (
          <AlignmentInspectionSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "radiography" && (
          <RadiographySection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "hydrobasin" && (
          <HydrobasinSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "transportation" && (
          <TransportationSection formData={formData} handleInputChange={handleInputChange} />
        )}
        {coverageType === "other" && (
          <OtherSection formData={formData} handleInputChange={handleInputChange} />
        )}

        {/* DECLARATION */}
        <div className="declaration-box">
          <input 
            type="checkbox" 
            id="declaration" 
            checked={declared}
            onChange={(e) => setDeclared(e.target.checked)}
            required 
          />
          <label htmlFor="declaration" className="form-label">
            I will provide suitable PPEs to all involved in hazardous activities
            and will be held responsible for violation of safety guidelines.
            <span 
              className="readmore" 
              onClick={() => setShowGuidelinesModal(true)}
              style={{ cursor: "pointer" }}
            > 
              READ MORE
            </span>
            <br />
            I will inform safety division telephonically before commencement of activity.{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
        </div>

        {/* APPROVALS */}
        <div className="approvals-container">
          <div className="approvals-left">
            <h3>Head, SFEED</h3>
            <p>Recommended / Not Recommended</p>
            <h3>Work Allocated To</h3>
            <h3>GD-T&S</h3>
            <p>Approved / Not Approved</p>
          </div>
          <div className="approvals-right">
            <label>Name & Designation</label>
            <input type="text" className="form-input" disabled placeholder="To be filled by approver" />
            <label>Contact No.</label>
            <input type="text" className="form-input" disabled placeholder="To be filled by approver" />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="button-group">
          <button type="button" className="btn save-btn" onClick={handleSave} disabled={loading}>
            SAVE
          </button>
          <button type="submit" className="btn send-btn" disabled={loading}>
            {loading ? "SUBMITTING..." : "SEND TO HEAD, SFEED"}
          </button>
        </div>
      </form>

      <GuidelinesModal 
        isOpen={showGuidelinesModal} 
        onClose={() => setShowGuidelinesModal(false)} 
      />

      <RequestsTable 
        personnelNumber={formData.personnelNumber}
        refresh={refreshTable}
        onRequestSelect={setSelectedRequest}
      />

      <RequestDetailsPrint 
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
}
