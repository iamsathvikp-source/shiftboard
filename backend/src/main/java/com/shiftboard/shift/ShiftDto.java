package com.shiftboard.shift;

import java.time.Instant;
import java.util.List;

public record ShiftDto(
        Long id,
        Long employeeId,
        Instant startDatetime,
        Instant endDatetime,
        List<SegmentDto> segments
) {
    public record SegmentDto(String type, Instant startDatetime, Instant endDatetime, boolean paid) {}

    static ShiftDto from(Shift s) {
        return new ShiftDto(
                s.getId(),
                s.getEmployee().getId(),
                s.getStartDatetime(),
                s.getEndDatetime(),
                s.getSegments().stream()
                        .map(g -> new SegmentDto(
                                g.getSegmentType().getCode(),
                                g.getStartDatetime(),
                                g.getEndDatetime(),
                                g.getSegmentType().isPaid()))
                        .toList());
    }
}