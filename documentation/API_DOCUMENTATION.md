# DRDL Fire Management System - API Documentation

## Overview
This document describes the REST API endpoints for the DRDL Fire Management System, a Spring Boot backend application that manages safety fire requests.

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication
Currently, no authentication is required. (Can be added with Spring Security in future)

## API Endpoints

### 1. Create Safety Request
**POST** `/safety-requests`

Create a new safety fire request.

**Request Body:**
```json
{
  "personnelNumber": "123456",
  "safetyCoverage": "integration",
  "directorate": "DRDL",
  "division": "Engineering",
  "integrationFacility": "NGRAM",
  "articleDetails": "Test article details",
  "workDescription": "Test work description",
  "activityInchargeName": "John Doe",
  "activityInchargeOrg": "DRDL",
  "activityInchargePhone": "9876543210",
  "designation": "Engineer",
  "activityFromDate": "2024-11-15",
  "activityToDate": "2024-11-20",
  "activitySchedule": "YES",
  "ambulanceRequired": "NO",
  "otherDetails": "Additional details",
  "testBed": "HTF",
  "tarbClearance": "obtained",
  "referenceNo": "REF001",
  "testControllerName": "Jane Smith",
  "testControllerDesignation": "Senior Engineer",
  "dateOfTest": "2024-11-15",
  "testScheduleTime": "10:30:00",
  "workCentre": "TSTC",
  "transportation": "From location to location",
  "transScheduleTime": "09:00:00",
  "transIncharge": "Driver Name",
  "vehicleDetails": "forklift",
  "driverName": "Driver Name",
  "driverDesignation": "Senior Driver",
  "driverAuth": "YES",
  "headSfeedStatus": "RECOMMENDED",
  "workAllocatedTo": "Team A",
  "gdTsStatus": "APPROVED"
}
```

**Response (201 Created):**
```json
{
  "requestId": 1,
  "personnelNumber": "123456",
  "dateOfRequest": "2024-11-02",
  "safetyCoverage": "integration",
  ...
}
```

### 2. Get All Safety Requests
**GET** `/safety-requests`

Retrieve all safety fire requests.

**Response (200 OK):**
```json
[
  {
    "requestId": 1,
    "personnelNumber": "123456",
    "safetyCoverage": "integration",
    ...
  },
  {
    "requestId": 2,
    "personnelNumber": "654321",
    "safetyCoverage": "static",
    ...
  }
]
```

### 3. Get Single Safety Request
**GET** `/safety-requests/{id}`

Retrieve a specific safety request by ID.

**Path Parameters:**
- `id` (Long, required): The request ID

**Response (200 OK):**
```json
{
  "requestId": 1,
  "personnelNumber": "123456",
  "safetyCoverage": "integration",
  ...
}
```

**Error Response (404 Not Found):**
```
Request not found
```

### 4. Update Safety Request
**PUT** `/safety-requests/{id}`

Update an existing safety request.

**Path Parameters:**
- `id` (Long, required): The request ID

**Request Body:** (Same as Create - all fields optional)
```json
{
  "ambulanceRequired": "YES",
  "headSfeedStatus": "NOT RECOMMENDED"
}
```

**Response (200 OK):**
```json
{
  "requestId": 1,
  "personalNumber": "123456",
  "ambulanceRequired": "YES",
  ...
}
```

### 5. Get Requests by Coverage Type
**GET** `/safety-requests/coverage/{coverage}`

Retrieve all requests for a specific safety coverage type.

**Path Parameters:**
- `coverage` (String, required): Type of coverage (integration, static, pressure, etc.)

**Response (200 OK):**
```json
[
  {
    "requestId": 1,
    "safetyCoverage": "integration",
    ...
  },
  {
    "requestId": 3,
    "safetyCoverage": "integration",
    ...
  }
]
```

### 6. Delete Safety Request
**DELETE** `/safety-requests/{id}`

Delete a specific safety request.

**Path Parameters:**
- `id` (Long, required): The request ID

**Response (204 No Content)**

**Error Response (404 Not Found):**
```
Request not found
```

---

## Data Models

### SafetyRequestDTO
```java
{
  requestId: Long,
  personnelNumber: String,
  dateOfRequest: LocalDate,
  safetyCoverage: String,
  directorate: String,
  division: String,
  integrationFacility: String,
  articleDetails: String,
  workDescription: String,
  activityInchargeName: String,
  activityInchargeOrg: String,
  activityInchargePhone: String,
  designation: String,
  activityFromDate: LocalDate,
  activityToDate: LocalDate,
  activitySchedule: String,
  ambulanceRequired: String,
  otherDetails: String,
  testBed: String,
  tarbClearance: String,
  referenceNo: String,
  testControllerName: String,
  testControllerDesignation: String,
  dateOfTest: LocalDate,
  testScheduleTime: LocalTime,
  workCentre: String,
  transportation: String,
  transScheduleTime: LocalTime,
  transIncharge: String,
  vehicleDetails: String,
  driverName: String,
  driverDesignation: String,
  driverAuth: String,
  headSfeedStatus: String,
  workAllocatedTo: String,
  gdTsStatus: String
}
```

---

## Safety Coverage Types
- `integration` - INTEGRATION
- `static` - STATIC TEST
- `thermostructural` - THERMOSTRUCTURAL
- `pressure` - PRESSURE TEST
- `grt` - GRT
- `alignment` - ALIGNMENT INSPECTION
- `radiography` - RADIOGRAPHY
- `hydrobasin` - HYDROBASIN
- `transportation` - TRANSPORTATION
- `other` - ANY OTHER (Specify)

---

## CORS Configuration
**Allowed Origins:** `http://localhost:3000`

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:** All

**Credentials:** Allowed

**Max Age:** 3600 seconds

---

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid request parameters"
}
```

**404 Not Found**
```json
{
  "error": "Request not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## Database Schema

### SAFETY_REQUEST Table

| Column | Type | Constraints |
|--------|------|-------------|
| REQUEST_ID | NUMBER | PRIMARY KEY, GENERATED BY DEFAULT AS IDENTITY |
| PERS_NO | CHAR(6) | NOT NULL |
| DATE_OF_REQUEST | DATE | DEFAULT SYSDATE |
| SAFETY_COVERAGE | VARCHAR2(50) | NOT NULL |
| DIRECTORATE | VARCHAR2(100) | - |
| DIVISION | VARCHAR2(100) | - |
| INTEGRATION_FAC | VARCHAR2(100) | - |
| ARTICLE_DETAILS | VARCHAR2(500) | - |
| WORK_DESCRIPTION | VARCHAR2(500) | - |
| ACT_INCHARGE_NAME | VARCHAR2(100) | - |
| ACT_INCHARGE_ORG | VARCHAR2(100) | - |
| ACT_INCHARGE_PHONE | VARCHAR2(15) | - |
| DESIGNATION | VARCHAR2(100) | - |
| ACTIVITY_FROM_DATE | DATE | - |
| ACTIVITY_TO_DATE | DATE | - |
| ACTIVITY_SCHEDULE | VARCHAR2(3) | CHECK (YES/NO) |
| ACTIVITY_PDF | BLOB | - |
| AMBULANCE_REQUIRED | VARCHAR2(3) | CHECK (YES/NO) |
| OTHER_DETAILS | VARCHAR2(500) | - |
| TEST_BED | VARCHAR2(100) | - |
| TARB_CLEARANCE | VARCHAR2(100) | - |
| REFERENCE_NO | VARCHAR2(100) | - |
| TEST_CTRL_NAME | VARCHAR2(100) | - |
| TEST_CTRL_DESIG | VARCHAR2(100) | - |
| DATE_OF_TEST | DATE | - |
| TEST_SCHEDULE_TIME | TIMESTAMP | - |
| WORK_CENTRE | VARCHAR2(100) | - |
| TRANSPORTATION | VARCHAR2(100) | - |
| TRANS_SCHEDULE_TIME | TIMESTAMP | - |
| TRANS_INCHARGE | VARCHAR2(100) | - |
| VEHICLE_DETAILS | VARCHAR2(100) | - |
| DRIVER_NAME | VARCHAR2(100) | - |
| DRIVER_DESIG | VARCHAR2(100) | - |
| DRIVER_AUTH | VARCHAR2(3) | CHECK (YES/NO) |
| HEAD_SFEED_STATUS | VARCHAR2(20) | CHECK (RECOMMENDED/NOT RECOMMENDED) |
| WORK_ALLOCATED_TO | VARCHAR2(100) | - |
| GD_TS_STATUS | VARCHAR2(20) | CHECK (APPROVED/NOT APPROVED) |

---

## Setup Instructions

### Backend Setup
1. Clone the repository
2. Navigate to `backend` directory
3. Update `application.properties` with Oracle database credentials
4. Run: `mvn spring-boot:run`
5. Server will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to `frontend` directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Application will open on `http://localhost:3000`

---

## Testing Endpoints

### Using cURL

**Create Request:**
```bash
curl -X POST http://localhost:8080/api/v1/safety-requests \
  -H "Content-Type: application/json" \
  -d '{"personnelNumber":"123456","safetyCoverage":"integration"}'
```

**Get All Requests:**
```bash
curl http://localhost:8080/api/v1/safety-requests
```

**Get Single Request:**
```bash
curl http://localhost:8080/api/v1/safety-requests/1
```

---

## Version History
- **v1.0.0** - Initial Release (November 2024)

---

## Support
For issues or questions, contact the DRDL development team.