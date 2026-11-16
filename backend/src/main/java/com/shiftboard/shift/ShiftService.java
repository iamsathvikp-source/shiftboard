package com.shiftboard.shift;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShiftService {

    static final ZoneId HOSPITAL_ZONE = ZoneId.of("America/Toronto");

    private final ShiftRepository shiftRepository;

    public ShiftService(ShiftRepository shiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    @Transactional(readOnly = true)
    public List<ShiftDto> findWeek(LocalDate anyDayInWeek) {
        LocalDate sunday = anyDayInWeek.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

        var from = sunday.atStartOfDay(HOSPITAL_ZONE).toInstant();
        var to = sunday.plusWeeks(1).atStartOfDay(HOSPITAL_ZONE).toInstant();

        return shiftRepository
                .findStartingBetween(from, to)
                .stream()
                .map(ShiftDto::from)
                .toList();
    }
}