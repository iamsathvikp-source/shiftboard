-- Experiment: does our index matter with LOTS of employees?
-- Adds 50,000 fake employees INSIDE a transaction, measures, then ROLLBACK.
-- Your real data is untouched when it finishes.
--   psql -h localhost -U shiftboard -d shiftboard -v ON_ERROR_STOP=1 -f scripts/explain_index_demo.sql

BEGIN;

INSERT INTO employee (employee_number, first_name, last_name, job_title, home_location)
SELECT 'T' || g, 'First' || (g % 500), 'Last' || lpad((g % 3000)::text, 4, '0'), 'Registered Nurse', 'ICU'
FROM generate_series(1, 50000) AS g;

ANALYZE employee;   -- refresh Postgres's statistics so the planner knows the table is big now

\echo '========== 1) WITH the index =========='
EXPLAIN ANALYZE
SELECT * FROM employee WHERE active ORDER BY last_name, first_name, id LIMIT 50;

DROP INDEX index_employee_active_name;   -- undone by the ROLLBACK below

\echo '========== 2) WITHOUT the index =========='
EXPLAIN ANALYZE
SELECT * FROM employee WHERE active ORDER BY last_name, first_name, id LIMIT 50;

ROLLBACK;   -- the 50,000 rows and the dropped index both come back to how they were

\echo '========== After ROLLBACK: should be 100 =========='
SELECT count(*) FROM employee;
