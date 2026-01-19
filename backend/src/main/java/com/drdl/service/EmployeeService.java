package com.drdl.service;

import com.drdl.dto.EmployeeDTO;
import com.drdl.dto.LoginRequestDTO;
import com.drdl.dto.LoginResponseDTO;
import com.drdl.model.Employee;
import com.drdl.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Authenticate employee login
     */
    public LoginResponseDTO login(LoginRequestDTO request) {
        LoginResponseDTO response = new LoginResponseDTO();
        
        Optional<Employee> employee = employeeRepository.findByPersonnelNo(request.getPersonnelNo());
        
        if (employee.isPresent()) {
            Employee emp = employee.get();
            // Simple password verification (consider using BCrypt in production)
            if (emp.getPassword().equals(request.getPassword()) && "ACTIVE".equals(emp.getStatus())) {
                response.setSuccess(true);
                response.setMessage("Login successful");
                response.setEmployee(mapEntityToDto(emp));
            } else {
                response.setSuccess(false);
                response.setMessage("Invalid credentials or employee is inactive");
            }
        } else {
            response.setSuccess(false);
            response.setMessage("Employee not found");
        }
        
        return response;
    }

    /**
     * Get all active employees
     */
    public List<EmployeeDTO> getAllActiveEmployees() {
        return employeeRepository.findAllByStatus("ACTIVE")
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get employee by personnel number
     */
    public Optional<EmployeeDTO> getEmployeeByPersonnelNo(String personnelNo) {
        return employeeRepository.findByPersonnelNo(personnelNo)
                .map(this::mapEntityToDto);
    }

    /**
     * Create new employee
     */
    public EmployeeDTO createEmployee(Employee employee) {
        Employee saved = employeeRepository.save(employee);
        return mapEntityToDto(saved);
    }

    /**
     * Update employee
     */
    public EmployeeDTO updateEmployee(Long empId, Employee employeeDetails) {
        Optional<Employee> existing = employeeRepository.findById(empId);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            emp.setEmployeeName(employeeDetails.getEmployeeName());
            emp.setDesignation(employeeDetails.getDesignation());
            emp.setDirectorate(employeeDetails.getDirectorate());
            emp.setDivision(employeeDetails.getDivision());
            emp.setAddress(employeeDetails.getAddress());
            emp.setPhone(employeeDetails.getPhone());
            emp.setEmail(employeeDetails.getEmail());
            emp.setStatus(employeeDetails.getStatus());
            Employee updated = employeeRepository.save(emp);
            return mapEntityToDto(updated);
        }
        return null;
    }

    /**
     * Delete employee
     */
    public boolean deleteEmployee(Long empId) {
        if (employeeRepository.existsById(empId)) {
            employeeRepository.deleteById(empId);
            return true;
        }
        return false;
    }

    private EmployeeDTO mapEntityToDto(Employee employee) {
        return new EmployeeDTO(
                employee.getEmpId(),
                employee.getEmployeeName(),
                employee.getPersonnelNo(),
                employee.getDesignation(),
                employee.getDirectorate(),
                employee.getDivision(),
                employee.getAddress(),
                employee.getPhone(),
                employee.getEmail(),
                employee.getStatus()
        );
    }
}
