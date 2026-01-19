const SAFETY_REQUEST_URL = 'http://localhost:8080/api/v1/safety-requests';
const EMPLOYEE_URL = 'http://localhost:8080/api/v1/employees';

class ApiService {
  // ==================== AUTHENTICATION ====================
  static login(personnelNo, password) {
    return fetch(`${EMPLOYEE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ personnelNo, password }),
    }).then(response => {
      if (!response.ok) throw new Error('Failed to login');
      return response.json();
    });
  }

  // ==================== EMPLOYEE ENDPOINTS ====================
  static getAllEmployees() {
    return fetch(`${EMPLOYEE_URL}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch employees');
        return response.json();
      });
  }

  static getEmployeeByPersonnelNo(personnelNo) {
    return fetch(`${EMPLOYEE_URL}/${personnelNo}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch employee');
        return response.json();
      });
  }

  // ==================== SAFETY REQUEST ENDPOINTS ====================
  // Create new safety request
  static createRequest(requestData) {
    return fetch(`${SAFETY_REQUEST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).then(response => {
      if (!response.ok) throw new Error('Failed to create request');
      return response.json();
    });
  }

  // Update existing request
  static updateRequest(id, requestData) {
    return fetch(`${SAFETY_REQUEST_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).then(response => {
      if (!response.ok) throw new Error('Failed to update request');
      return response.json();
    });
  }

  // Get single request
  static getRequest(id) {
    return fetch(`${SAFETY_REQUEST_URL}/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch request');
        return response.json();
      });
  }

  // Get all requests
  static getAllRequests() {
    return fetch(`${SAFETY_REQUEST_URL}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch requests');
        return response.json();
      });
  }

  // Get requests by coverage type
  static getRequestsByCoverage(coverage) {
    return fetch(`${SAFETY_REQUEST_URL}/coverage/${coverage}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch requests');
        return response.json();
      });
  }

  // Get requests by personnel number
  static getRequestsByPersonnelNumber(personnelNumber) {
    return fetch(`${SAFETY_REQUEST_URL}/personnel/${personnelNumber}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch requests');
        return response.json();
      });
  }

  // Delete request
  static deleteRequest(id) {
    return fetch(`${SAFETY_REQUEST_URL}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (!response.ok) throw new Error('Failed to delete request');
      return response.ok;
    });
  }
}

export default ApiService;