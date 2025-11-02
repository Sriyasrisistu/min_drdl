const API_BASE_URL = 'http://localhost:8080/api/v1/safety-requests';

class ApiService {
  // Create new safety request
  static createRequest(requestData) {
    return fetch(`${API_BASE_URL}`, {
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
    return fetch(`${API_BASE_URL}/${id}`, {
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
    return fetch(`${API_BASE_URL}/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch request');
        return response.json();
      });
  }

  // Get all requests
  static getAllRequests() {
    return fetch(`${API_BASE_URL}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch requests');
        return response.json();
      });
  }

  // Get requests by coverage type
  static getRequestsByCoverage(coverage) {
    return fetch(`${API_BASE_URL}/coverage/${coverage}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch requests');
        return response.json();
      });
  }

  // Delete request
  static deleteRequest(id) {
    return fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (!response.ok) throw new Error('Failed to delete request');
      return response.ok;
    });
  }
}

export default ApiService;