package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_enrollments", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(length = 20)
    private String semester;
    
    @Column(name = "academic_year", length = 20)
    private String academicYear;
} 