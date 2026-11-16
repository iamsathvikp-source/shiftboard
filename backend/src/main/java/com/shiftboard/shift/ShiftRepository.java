package com.shiftboard.shift;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    @Query("""
            select s from Shift s
            left join fetch s.segments g
            left join fetch g.segmentType
            where s.startDatetime >= :from
              and s.startDatetime < :to
            order by s.startDatetime, g.startDatetime
            """)
    List<Shift> findStartingBetween(@Param("from") Instant from, @Param("to") Instant to);
}