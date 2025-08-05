package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @Column(name = "course_code", unique = true, nullable = false, length = 10)
    private String courseCode;
    
    @Column(name = "course_name", nullable = false, length = 100)
    private String courseName;
    
    @Column(name = "credit_hours", nullable = false)
    private Integer creditHours;
} 