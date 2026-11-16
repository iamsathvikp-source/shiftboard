CREATE TABLE segment_type (
    code    VARCHAR(20) PRIMARY KEY,
    name    VARCHAR(50) NOT NULL,
    is_paid BOOLEAN     NOT NULL
);

INSERT INTO segment_type (code, name, is_paid)
VALUES ('WORK', 'Work', TRUE),
       ('BREAK', 'Break', TRUE);

CREATE TABLE shift_segment (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    shift_id          BIGINT      NOT NULL REFERENCES shift (id) ON DELETE CASCADE,
    segment_type_code VARCHAR(20) NOT NULL REFERENCES segment_type (code),
    start_datetime    TIMESTAMPTZ NOT NULL,
    end_datetime      TIMESTAMPTZ NOT NULL,

    CONSTRAINT ck_segment_ends_after_starts CHECK (end_datetime > start_datetime),

    CONSTRAINT ex_segment_no_overlap_per_shift EXCLUDE USING gist (
        shift_id WITH =,
        tstzrange(start_datetime, end_datetime, '[)') WITH &&
    )
);

CREATE INDEX index_segment_shift_start ON shift_segment (shift_id, start_datetime);