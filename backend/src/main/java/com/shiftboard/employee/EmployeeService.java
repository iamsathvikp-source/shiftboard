package com.shiftboard.employee;


import com.shiftboard.common.PageResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    static final int MAX_PAGE_SIZE = 100;
    private static final Sort SCHEDULE_ORDER = Sort.by("lastName", "firstName", "id");

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<EmployeeDto> findActive(int page, int size) {
        int safePage = Math.max(page, 0);                               // no negative pages
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);      // between 1 and 100

        var pageable = PageRequest.of(safePage, safeSize, SCHEDULE_ORDER);
        return PageResponse.of(employeeRepository.findByActiveTrue(pageable), EmployeeDto::from);
    }
}
