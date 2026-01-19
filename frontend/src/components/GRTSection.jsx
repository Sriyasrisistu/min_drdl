import React, { useState, useMemo } from "react";

export default function GRTSection({ formData, handleInputChange }) {
  const [workCentre, setWorkCentre] = useState("");
  const [tarbStatus, setTarbStatus] = useState("");
  const [activitySchedule, setActivitySchedule] = useState("");
  const [ambulance, setAmbulance] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const todayDate = useMemo(() => getTodayDate(), []);

  const handleFromDateChange = (e) => {
    const date = e.target.value;
    setFromDate(date);
    // Reset toDate if it's before the new fromDate
    if (toDate && date > toDate) {
      setToDate("");
    }
  };

  const handleToDateChange = (e) => {
    const date = e.target.value;
    if (!fromDate) {
      alert("Please select From Date first");
      return;
    }
    if (date < fromDate) {
      alert("To Date cannot be before From Date");
      return;
    }
    setToDate(date);
  };

  return (
    <div className="form-section">
      <label className="form-label">Directorate</label>
      <p className="form-static-text">{formData.directorate || "Not Set"}</p>
      <label className="form-label">Division</label>
      <p className="form-static-text">{formData.division || "Not Set"}</p>

      <label className="form-label">Work Centre *</label>
      <select
        className="form-select"
        value={workCentre}
        onChange={(e) => setWorkCentre(e.target.value)}
        required
      >
        <option value="">Select Work Centre</option>
        <option value="GRT">GRT</option>
        <option value="other">ANY OTHER (Specify)</option>
      </select>
      {workCentre === "other" && (
        <input
          type="text"
          placeholder="Specify Work Centre"
          className="form-input placeholder-box"
          required
        />
      )}

      <label className="form-label">Details of Article Under Test *</label>
      <input type="text" className="form-input" placeholder="Enter details" required />

      <label className="form-label">Description of Work *</label>
      <textarea className="form-input" placeholder="Enter description" required />

      <label className="form-label">TARB Clearance *</label>
      <select
        className="form-select"
        value={tarbStatus}
        onChange={(e) => setTarbStatus(e.target.value)}
        required
      >
        <option value="">Select</option>
        <option value="obtained">Obtained</option>
        <option value="notobtained">Not Obtained</option>
        <option value="notapplicable">Not Applicable</option>
      </select>
      {tarbStatus === "obtained" && (
        <>
          <label className="form-label">TARB Reference No. *</label>
          <input type="text" className="form-input" required />
        </>
      )}
      {tarbStatus === "notobtained" && (
        <>
          <label className="form-label">Reason *</label>
          <textarea className="form-input" placeholder="Enter reason" required></textarea>
        </>
      )}

      <label className="form-label">Test Controller Name *</label>
      <input type="text" className="form-input" required />

      <label className="form-label">Test Controller Designation *</label>
      <input type="text" className="form-input" required />

      <label className="form-label">Date of Test *</label>
      <div className="date-group">
        <input 
          type="date" 
          className="form-input" 
          min={todayDate}
          value={fromDate}
          onChange={handleFromDateChange}
          required 
        />
        <input 
          type="date" 
          className="form-input" 
          min={fromDate || todayDate}
          value={toDate}
          onChange={handleToDateChange}
          required 
        />
      </div>

      <label className="form-label">Scheduled Time of Test *</label>
      <input type="time" className="form-input" required />

      <label className="form-label">Activity Schedule *</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="schedule"
            value="available"
            onChange={(e) => setActivitySchedule(e.target.value)}
            required
          />
          Available
        </label>
        <label>
          <input
            type="radio"
            name="schedule"
            value="notavailable"
            onChange={(e) => setActivitySchedule(e.target.value)}
          />
          Not Available
        </label>
      </div>
      {activitySchedule === "available" && (
        <input type="file" accept=".pdf" className="form-input" required />
      )}
      {activitySchedule === "notavailable" && (
        <textarea className="form-input" placeholder="Enter reason" required></textarea>
      )}

      <label className="form-label">Ambulance *</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="ambulance"
            value="required"
            onChange={(e) => setAmbulance(e.target.value)}
            required
          />
          Required (Requisition Tab)
        </label>
        <label>
          <input
            type="radio"
            name="ambulance"
            value="notrequired"
            onChange={(e) => setAmbulance(e.target.value)}
          />
          Not Required
        </label>
      </div>
      {ambulance === "notrequired" && (
        <textarea className="form-input" placeholder="Enter reason" required></textarea>
      )}

      <label className="form-label">Any Other Details</label>
      <textarea className="form-input" placeholder="Enter details" />
    </div>
  );
}
