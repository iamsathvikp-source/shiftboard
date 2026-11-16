package com.shiftboard.shift;

import com.shiftboard.employee.Employee;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "shift")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "start_datetime", nullable = false)
    private Instant startDatetime;

    @Column(name = "end_datetime", nullable = false)
    private Instant endDatetime;

    @OneToMany(mappedBy = "shift", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("startDatetime ASC")
    private List<ShiftSegment> segments = new ArrayList<>();

    protected Shift() {}

    public Shift(Employee employee, Instant startDatetime, Instant endDatetime) {
        this.employee = employee;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
    }

    public Long getId() { return id; }
    public Employee getEmployee() { return employee; }
    public Instant getStartDatetime() { return startDatetime; }
    public Instant getEndDatetime() { return endDatetime; }
    public List<ShiftSegment> getSegments() {
        return Collections.unmodifiableList(segments);
    }

    public void addSegment(SegmentType type, Instant start, Instant end) {
        segments.add(new ShiftSegment(this, type, start, end));
    }
}
