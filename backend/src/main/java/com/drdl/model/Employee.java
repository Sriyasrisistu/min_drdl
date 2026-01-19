package com.drdl.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "EMPLOYEE_DETAILS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMP_ID")
    private Long empId;

    @Column(name = "EMPLOYEE_NAME", length = 100, nullable = false)
    private String employeeName;

    @Column(name = "PERSONNEL_NO", length = 6, nullable = false, unique = true)
    private String personnelNo;

    @Column(name = "DESIGNATION", length = 100, nullable = false)
    private String designation;

    @Column(name = "DIRECTORATE", length = 100)
    private String directorate;

    @Column(name = "DIVISION", length = 100)
    private String division;

    @Column(name = "ADDRESS", length = 300)
    private String address;

    @Column(name = "PHONE", length = 15)
    private String phone;

    @Column(name = "EMAIL", length = 100)
    private String email;

    @Column(name = "PASSWORD", length = 255)
    private String password;

    @Column(name = "STATUS", length = 20)
    private String status; // ACTIVE, INACTIVE
}
