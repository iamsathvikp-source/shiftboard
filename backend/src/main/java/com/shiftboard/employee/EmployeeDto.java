package com.shiftboard.employee;

public record EmployeeDto(
        Long id,
        String employeeNumber,
        String fullName,
        String jobTitle,
        String homeLocation
) {
    static EmployeeDto from (Employee e) {
        return new EmployeeDto(
                e.getId(),
                e.getEmployeeNumber(),
                e.getLastName() + ", " + e.getFirstName(),
                e.getJobTitle(),
                e.getHomeLocation()
        );
    }
}
