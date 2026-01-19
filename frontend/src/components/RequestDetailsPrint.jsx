import React from 'react';
import './RequestDetailsPrint.css';

const RequestDetailsPrint = ({ request, onClose }) => {
  if (!request) {
    return (
      <div className="no-request-message">
        <p>Select a request from the table to view details and print</p>
      </div>
    );
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=1000');
    const content = document.getElementById('print-content').innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Safety Fire Request - ${request.uniqueId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #333;
            }
            @page { size: A4 landscape; margin: 20mm; }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0 0 5px 0;
              color: #1a3a52;
              font-size: 18px;
              letter-spacing: 0.6px;
            }
            .header p {
              margin: 5px 0;
              font-size: 12px;
            }
            .request-id {
              text-align: right;
              font-weight: bold;
              margin-bottom: 15px;
              font-size: 14px;
            }
            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .section-title {
              background-color: #667eea;
              color: white;
              padding: 8px 12px;
              margin-bottom: 10px;
              font-weight: bold;
              font-size: 13px;
            }
            .field-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 12px;
            }
            .field-row.full {
              grid-template-columns: 1fr;
            }
            .field {
              border: 1px solid #ddd;
              padding: 8px;
              background-color: #f9f9f9;
              font-size: 12px;
            }
            .field-label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 3px;
              font-size: 11px;
            }
            .field-value {
              color: #333;
              word-break: break-word;
            }
            .footer {
              margin-top: 40px;
              border-top: 1px solid #ddd;
              padding-top: 15px;
              font-size: 11px;
              text-align: center;
              color: #666;
            }
            @media print {
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SAFETY &amp; FIRE COVERAGE REQUEST FORM</h1>
            <p>Defence Research and Development Laboratory</p>
          </div>
          ${content}
          <div class="footer">
            <p>Document Generated: ${new Date().toLocaleString()}</p>
            <p>This is an electronically generated document.</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="request-details-container">
      <div className="details-header">
        <h2>Request Details</h2>
        <button onClick={handlePrint} className="btn-print-large">
          🖨️ Print to PDF
        </button>
        <button onClick={onClose} className="btn-close">
          ✕
        </button>
      </div>

      <div id="print-content">
        {/* REQUEST INFORMATION SECTION */}
        <div className="section">
          <div className="section-title">REQUEST INFORMATION</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Unique Request ID</div>
              <div className="field-value">{request.uniqueId}</div>
            </div>
            <div className="field">
              <div className="field-label">Personnel Number</div>
              <div className="field-value">{request.personnelNumber}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Date of Request</div>
              <div className="field-value">{request.dateOfRequest ? new Date(request.dateOfRequest).toLocaleDateString() : "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Safety Coverage</div>
              <div className="field-value">{request.safetyCoverage}</div>
            </div>
          </div>
        </div>

        {/* ORGANIZATIONAL DETAILS */}
        <div className="section">
          <div className="section-title">ORGANIZATIONAL DETAILS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Directorate</div>
              <div className="field-value">{request.directorate}</div>
            </div>
            <div className="field">
              <div className="field-label">Division</div>
              <div className="field-value">{request.division}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Integration Facility</div>
              <div className="field-value">{request.integrationFacility}</div>
            </div>
          </div>
        </div>

        {/* ARTICLE/PROJECT DETAILS */}
        <div className="section">
          <div className="section-title">ARTICLE/PROJECT DETAILS</div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Article Details</div>
              <div className="field-value">{request.articleDetails}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Work Description</div>
              <div className="field-value">{request.workDescription}</div>
            </div>
          </div>
        </div>

        {/* ACTIVITY INCHARGE DETAILS */}
        <div className="section">
          <div className="section-title">ACTIVITY INCHARGE DETAILS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Name</div>
              <div className="field-value">{request.activityInchargeName}</div>
            </div>
            <div className="field">
              <div className="field-label">Organization</div>
              <div className="field-value">{request.activityInchargeOrg}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Designation</div>
              <div className="field-value">{request.designation}</div>
            </div>
            <div className="field">
              <div className="field-label">Phone</div>
              <div className="field-value">{request.activityInchargePhone}</div>
            </div>
          </div>
        </div>

        {/* ACTIVITY SCHEDULE DETAILS */}
        <div className="section">
          <div className="section-title">ACTIVITY SCHEDULE DETAILS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Activity From Date</div>
              <div className="field-value">{request.activityFromDate ? new Date(request.activityFromDate).toLocaleDateString() : "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Activity To Date</div>
              <div className="field-value">{request.activityToDate ? new Date(request.activityToDate).toLocaleDateString() : "N/A"}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Activity Schedule</div>
              <div className="field-value">{request.activitySchedule || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Activity PDF</div>
              <div className="field-value">{request.activityPdf ? "Available" : "Not Available"}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Work Centre</div>
              <div className="field-value">{request.workCentre || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* TEST CONTROLLER DETAILS */}
        <div className="section">
          <div className="section-title">TEST DETAILS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Test Bed</div>
              <div className="field-value">{request.testBed || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Date of Test</div>
              <div className="field-value">{request.dateOfTest ? new Date(request.dateOfTest).toLocaleDateString() : "N/A"}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Test Schedule Time</div>
              <div className="field-value">{request.testScheduleTime || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">TARB Clearance</div>
              <div className="field-value">{request.tarbClearance || "N/A"}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Test Controller Name</div>
              <div className="field-value">{request.testControllerName || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Test Controller Designation</div>
              <div className="field-value">{request.testControllerDesignation || "N/A"}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Reference No</div>
              <div className="field-value">{request.referenceNo || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* TRANSPORTATION DETAILS */}
        <div className="section">
          <div className="section-title">TRANSPORTATION DETAILS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Transportation</div>
              <div className="field-value">{request.transportation || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Transportation Schedule Time</div>
              <div className="field-value">{request.transScheduleTime || "N/A"}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Trans Incharge</div>
              <div className="field-value">{request.transIncharge || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Vehicle Details</div>
              <div className="field-value">{request.vehicleDetails || "N/A"}</div>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Driver Name</div>
              <div className="field-value">{request.driverName || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Driver Designation</div>
              <div className="field-value">{request.driverDesignation || "N/A"}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">Driver Auth</div>
              <div className="field-value">{request.driverAuth || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* APPROVAL STATUS */}
        <div className="section">
          <div className="section-title">APPROVAL STATUS</div>
          <div className="field-row">
            <div className="field">
              <div className="field-label">Head SFEED Status</div>
              <div className="field-value">{request.headSfeedStatus || "N/A"}</div>
            </div>
            <div className="field">
              <div className="field-label">Work Allocated To</div>
              <div className="field-value">{request.workAllocatedTo || "N/A"}</div>
            </div>
          </div>
          <div className="field-row full">
            <div className="field">
              <div className="field-label">GD TS Status</div>
              <div className="field-value">{request.gdTsStatus || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPrint;
