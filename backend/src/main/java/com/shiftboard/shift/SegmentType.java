package com.shiftboard.shift;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "segment_type")
public class SegmentType {

    @Id
    @Column(length = 20)
    private String code;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(name = "is_paid", nullable = false)
    private boolean paid;

    protected SegmentType() {}

    public String getCode() { return code; }
    public String getName() { return name; }
    public boolean isPaid() { return paid; }

}
