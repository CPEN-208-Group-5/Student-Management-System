package com.finalproject.backend.service;

import com.finalproject.backend.entity.Grade;
import com.finalproject.backend.entity.Student;
import com.finalproject.backend.entity.Course;
import com.finalproject.backend.repository.GradeRepository;
import com.finalproject.backend.repository.StudentRepository;
import com.finalproject.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GradeService {
    
    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    
    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }
    
    public Optional<Grade> getGradeById(Long id) {
        return gradeRepository.findById(id);
    }
    
    public List<Grade> getGradesByStudent(Long studentId) {
        return gradeRepository.findByStudentId(studentId);
    }
    
    public List<Grade> getGradesByStudentAndSemester(Long studentId, String semester, String academicYear) {
        return gradeRepository.findByStudentIdAndSemesterAndAcademicYear(studentId, semester, academicYear);
    }
    
    public List<Grade> getGradesByCourse(Long courseId) {
        return gradeRepository.findByCourseId(courseId);
    }
    
    public Grade createGrade(Grade grade) {
        // Validate that student and course exist
        if (!studentRepository.existsById(grade.getStudent().getId())) {
            throw new IllegalArgumentException("Student not found");
        }
        if (!courseRepository.existsById(grade.getCourse().getId())) {
            throw new IllegalArgumentException("Course not found");
        }
        
        // Set grade date if not provided
        if (grade.getGradeDate() == null) {
            grade.setGradeDate(LocalDate.now());
        }
        
        return gradeRepository.save(grade);
    }
    
    public Grade updateGrade(Long id, Grade gradeDetails) {
        Grade grade = gradeRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Grade not found"));
        
        if (gradeDetails.getGradeValue() != null) {
            grade.setGradeValue(gradeDetails.getGradeValue());
        }
        if (gradeDetails.getLetterGrade() != null) {
            grade.setLetterGrade(gradeDetails.getLetterGrade());
        }
        if (gradeDetails.getSemester() != null) {
            grade.setSemester(gradeDetails.getSemester());
        }
        if (gradeDetails.getAcademicYear() != null) {
            grade.setAcademicYear(gradeDetails.getAcademicYear());
        }
        
        return gradeRepository.save(grade);
    }
    
    public void deleteGrade(Long id) {
        if (!gradeRepository.existsById(id)) {
            throw new IllegalArgumentException("Grade not found");
        }
        gradeRepository.deleteById(id);
    }
    
    public BigDecimal calculateStudentGPA(Long studentId) {
        BigDecimal gpa = gradeRepository.calculateAverageGPA(studentId);
        return gpa != null ? gpa.setScale(1, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }
    
    public BigDecimal calculateStudentGPABySemester(Long studentId, String semester, String academicYear) {
        List<Grade> semesterGrades = getGradesByStudentAndSemester(studentId, semester, academicYear);
        if (semesterGrades.isEmpty()) {
            return BigDecimal.ZERO;
        }
        
        BigDecimal totalGradePoints = semesterGrades.stream()
            .map(grade -> grade.getGradeValue() != null ? grade.getGradeValue() : BigDecimal.ZERO)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        return totalGradePoints.divide(BigDecimal.valueOf(semesterGrades.size()), 1, RoundingMode.HALF_UP);
    }
}
