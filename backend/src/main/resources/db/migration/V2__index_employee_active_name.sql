CREATE INDEX index_employee_active_name
    ON employee (last_name, first_name, id)
    WHERE active;