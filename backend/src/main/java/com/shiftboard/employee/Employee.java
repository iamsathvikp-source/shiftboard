package com.shiftboard.employee;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_number", nullable = false, unique = true, length = 20)
    private String employeeNumber;

    @Column(name = "first_name", nullable = false, length = 80)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 80)
    private String lastName;

    @Column(name = "job_title", nullable = false, length = 80)
    private String jobTitle;

    @Column(name = "home_location", nullable = false, length = 80)
    private String homeLocation;

    @Column(nullable = false)
    private boolean active = true;

    protected Employee() {}

    public Long getId() { return id; }
    public String getEmployeeNumber() { return employeeNumber; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getJobTitle() { return jobTitle; }
    public String getHomeLocation() { return homeLocation; }
    public boolean isActive() { return active; }
}
