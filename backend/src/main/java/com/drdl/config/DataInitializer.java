package com.drdl.config;

import com.drdl.model.Employee;
import com.drdl.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample employee data only if table is empty
        if (employeeRepository.count() == 0) {
            Employee emp1 = new Employee();
            emp1.setEmployeeName("Dr. Rajesh Kumar");
            emp1.setPersonnelNo("001234");
            emp1.setDesignation("Senior Scientist");
            emp1.setDirectorate("Aeronautics");
            emp1.setDivision("Flight Mechanics");
            emp1.setAddress("123 DRDL Campus, Bangalore - 560075");
            emp1.setPhone("080-1234-5678");
            emp1.setEmail("rajesh.kumar@drdl.gov.in");
            emp1.setPassword("pass123");
            emp1.setStatus("ACTIVE");

            Employee emp2 = new Employee();
            emp2.setEmployeeName("Ms. Priya Sharma");
            emp2.setPersonnelNo("001235");
            emp2.setDesignation("Scientist");
            emp2.setDirectorate("Systems & Analysis");
            emp2.setDivision("Control Systems");
            emp2.setAddress("456 DRDL Campus, Bangalore - 560075");
            emp2.setPhone("080-2345-6789");
            emp2.setEmail("priya.sharma@drdl.gov.in");
            emp2.setPassword("pass123");
            emp2.setStatus("ACTIVE");

            Employee emp3 = new Employee();
            emp3.setEmployeeName("Shri Vikram Singh");
            emp3.setPersonnelNo("001236");
            emp3.setDesignation("Senior Technical Officer");
            emp3.setDirectorate("Structures & Mechanical Systems");
            emp3.setDivision("Materials & Manufacturing");
            emp3.setAddress("789 DRDL Campus, Bangalore - 560075");
            emp3.setPhone("080-3456-7890");
            emp3.setEmail("vikram.singh@drdl.gov.in");
            emp3.setPassword("pass123");
            emp3.setStatus("ACTIVE");

            Employee emp4 = new Employee();
            emp4.setEmployeeName("Dr. Anita Verma");
            emp4.setPersonnelNo("001237");
            emp4.setDesignation("Principal Scientist");
            emp4.setDirectorate("Propulsion");
            emp4.setDivision("Aero-Engine Integration");
            emp4.setAddress("321 DRDL Campus, Bangalore - 560075");
            emp4.setPhone("080-4567-8901");
            emp4.setEmail("anita.verma@drdl.gov.in");
            emp4.setPassword("pass123");
            emp4.setStatus("ACTIVE");

            Employee emp5 = new Employee();
            emp5.setEmployeeName("Mr. Arun Patel");
            emp5.setPersonnelNo("001238");
            emp5.setDesignation("Technical Officer");
            emp5.setDirectorate("Systems & Analysis");
            emp5.setDivision("Avionics");
            emp5.setAddress("654 DRDL Campus, Bangalore - 560075");
            emp5.setPhone("080-5678-9012");
            emp5.setEmail("arun.patel@drdl.gov.in");
            emp5.setPassword("pass123");
            emp5.setStatus("ACTIVE");

            employeeRepository.saveAll(Arrays.asList(emp1, emp2, emp3, emp4, emp5));
            System.out.println("Employee data initialized successfully!");
        }
    }
}
