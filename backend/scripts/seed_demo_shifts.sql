-- Fake demo shifts for local development, built around TODAY's date,
-- so the schedule grid always has something to show.
-- Covers 5 weeks: last week, this week, and the next 3 weeks.
--
-- NOT a Flyway migration. Run it by hand after seed_demo_employees.sql:
--   psql -h localhost -U shiftboard -d shiftboard -f scripts/seed_demo_shifts.sql
--
-- Safe to run more than once: shifts that would overlap an existing one
-- for the same employee are skipped (ON CONFLICT DO NOTHING uses the
-- ex_shift_no_overlap_per_employee constraint), and only NEW shifts get segments.

BEGIN;

WITH
-- Sunday of last week
params AS (
    SELECT (current_date - extract(dow FROM current_date)::int) - 7 AS first_day
),

-- 35 days = 5 weeks
days AS (
    SELECT (p.first_day + g)::date AS day
    FROM params p, generate_series(0, 34) AS g
),

-- Who works when. Each active employee gets a fixed pattern based on their id:
--   start time : 07:00 day shift, 15:00 evening shift, or 23:00 night shift (ends next morning)
--   length     : 8h30 (with a 30-min break), or 4h for part-timers (no break)
--   days off   : 2 per week, on different weekdays for different people
plan AS (
    SELECT e.id AS employee_id,
           d.day,
           CASE e.id % 4
               WHEN 2 THEN time '15:00'
               WHEN 3 THEN time '23:00'
               ELSE        time '07:00'
           END AS start_time,
           CASE WHEN e.id % 7 = 0 THEN interval '4 hours'
                ELSE interval '8 hours 30 minutes'
           END AS shift_length
    FROM employee e
    CROSS JOIN days d
    WHERE e.active
      AND (extract(dow FROM d.day)::int + e.id) % 7 NOT IN (0, 1)
),

-- Insert the shifts. Times are Toronto local time, converted to exact moments,
-- so daylight-saving changes are handled by Postgres.
new_shifts AS (
    INSERT INTO shift (employee_id, start_datetime, end_datetime)
    SELECT employee_id,
           (day + start_time) AT TIME ZONE 'America/Toronto',
           ((day + start_time) AT TIME ZONE 'America/Toronto') + shift_length
    FROM plan
    ON CONFLICT DO NOTHING
    RETURNING id, start_datetime, end_datetime
)

-- Segments for the shifts we just created:
--   short shift  -> one WORK segment
--   long shift   -> WORK 4h, BREAK 30 min, WORK the rest
INSERT INTO shift_segment (shift_id, segment_type_code, start_datetime, end_datetime)
SELECT id, 'WORK', start_datetime, end_datetime
FROM new_shifts WHERE end_datetime - start_datetime <= interval '6 hours'
UNION ALL
SELECT id, 'WORK', start_datetime, start_datetime + interval '4 hours'
FROM new_shifts WHERE end_datetime - start_datetime > interval '6 hours'
UNION ALL
SELECT id, 'BREAK', start_datetime + interval '4 hours', start_datetime + interval '4 hours 30 minutes'
FROM new_shifts WHERE end_datetime - start_datetime > interval '6 hours'
UNION ALL
SELECT id, 'WORK', start_datetime + interval '4 hours 30 minutes', end_datetime
FROM new_shifts WHERE end_datetime - start_datetime > interval '6 hours';

COMMIT;
