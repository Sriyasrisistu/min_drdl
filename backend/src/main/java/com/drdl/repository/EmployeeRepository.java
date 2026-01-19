package com.drdl.repository;

import com.drdl.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByPersonnelNo(String personnelNo);
    List<Employee> findAllByStatus(String status);
}
