CREATE TABLE employee
(
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_number VARCHAR(20) NOT NULL,
    first_name      VARCHAR(80) NOT NULL,
    last_name       VARCHAR(80) NOT NULL,
    job_title       VARCHAR(80) NOT NULL,
    home_location   VARCHAR(80) NOT NULL,
    active          BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_employee_number UNIQUE (employee_number)
);