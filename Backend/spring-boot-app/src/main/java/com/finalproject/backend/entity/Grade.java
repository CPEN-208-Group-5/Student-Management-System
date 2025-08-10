package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "grades", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(name = "semester", length = 20)
    private String semester;
    
    @Column(name = "academic_year", length = 20)
    private String academicYear;
    
    @Column(name = "grade_value", precision = 3, scale = 1)
    private BigDecimal gradeValue; // 0.0 to 4.0 scale
    
    @Column(name = "letter_grade", length = 2)
    private String letterGrade; // A, A-, B+, B, B-, C+, C, C-, D+, D, F
    
    @Column(name = "grade_date")
    private java.time.LocalDate gradeDate;
}
