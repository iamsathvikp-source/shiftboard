CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE shift (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_id    BIGINT      NOT NULL REFERENCES employee (id),
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime   TIMESTAMPTZ NOT NULL,

    CONSTRAINT ck_shift_ends_after_starts CHECK (end_datetime > start_datetime),
    CONSTRAINT ck_shift_max_24h CHECK ( end_datetime - start_datetime <= INTERVAL '24 hours'),

    CONSTRAINT ex_shift_no_overlap_per_employee EXCLUDE USING gist (
        employee_id WITH =,
        tstzrange(start_datetime, end_datetime, '[)') WITH &&
    )
);

CREATE INDEX index_shift_employee_start ON shift (employee_id, start_datetime);
