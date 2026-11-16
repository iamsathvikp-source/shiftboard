package com.shiftboard.shift;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "shift_segment")
public class ShiftSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shift_id")
    private Shift shift;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "segment_type_code")
    private SegmentType segmentType;

    @Column(name = "start_datetime", nullable = false)
    private Instant startDatetime;

    @Column(name = "end_datetime", nullable = false)
    private Instant endDatetime;

    protected ShiftSegment() {}

    ShiftSegment(Shift shift, SegmentType segmentType, Instant startDatetime, Instant endDatetime) {
        this.shift = shift;
        this.segmentType = segmentType;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
    }

    public Long getId() { return id; }
    public Shift getShift() { return shift; }
    public SegmentType getSegmentType() { return segmentType; }
    public Instant getStartDatetime() { return startDatetime; }
    public Instant getEndDatetime() { return endDatetime; }
}