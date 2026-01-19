package com.drdl.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long empId;
    private String employeeName;
    private String personnelNo;
    private String designation;
    private String directorate;
    private String division;
    private String address;
    private String phone;
    private String email;
    private String status;
}
