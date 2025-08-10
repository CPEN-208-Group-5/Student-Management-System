package com.finalproject.backend.repository;

import com.finalproject.backend.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.math.BigDecimal;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    
    List<Grade> findByStudentId(Long studentId);
    
    List<Grade> findByStudentIdAndSemesterAndAcademicYear(Long studentId, String semester, String academicYear);
    
    List<Grade> findByCourseId(Long courseId);
    
    @Query("SELECT AVG(g.gradeValue) FROM Grade g WHERE g.student.id = :studentId")
    BigDecimal calculateAverageGPA(@Param("studentId") Long studentId);
    
    @Query("SELECT g FROM Grade g WHERE g.student.id = :studentId ORDER BY g.academicYear DESC, g.semester DESC")
    List<Grade> findGradesByStudentOrderedByYearAndSemester(@Param("studentId") Long studentId);
}
