package com.finalproject.backend.controller;

import com.finalproject.backend.entity.Grade;
import com.finalproject.backend.service.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GradeController {
    
    private final GradeService gradeService;
    
    @GetMapping
    public ResponseEntity<List<Grade>> getAllGrades() {
        return ResponseEntity.ok(gradeService.getAllGrades());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        return gradeService.getGradeById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getGradesByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(gradeService.getGradesByStudent(studentId));
    }
    
    @GetMapping("/student/{studentId}/semester")
    public ResponseEntity<List<Grade>> getGradesByStudentAndSemester(
            @PathVariable Long studentId,
            @RequestParam String semester,
            @RequestParam String academicYear) {
        return ResponseEntity.ok(gradeService.getGradesByStudentAndSemester(studentId, semester, academicYear));
    }
    
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Grade>> getGradesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(gradeService.getGradesByCourse(courseId));
    }
    
    @GetMapping("/student/{studentId}/gpa")
    public ResponseEntity<BigDecimal> getStudentGPA(@PathVariable Long studentId) {
        return ResponseEntity.ok(gradeService.calculateStudentGPA(studentId));
    }
    
    @GetMapping("/student/{studentId}/gpa/semester")
    public ResponseEntity<BigDecimal> getStudentGPABySemester(
            @PathVariable Long studentId,
            @RequestParam String semester,
            @RequestParam String academicYear) {
        return ResponseEntity.ok(gradeService.calculateStudentGPABySemester(studentId, semester, academicYear));
    }
    
    @PostMapping
    public ResponseEntity<Grade> createGrade(@RequestBody Grade grade) {
        try {
            Grade createdGrade = gradeService.createGrade(grade);
            return ResponseEntity.ok(createdGrade);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade gradeDetails) {
        try {
            Grade updatedGrade = gradeService.updateGrade(id, gradeDetails);
            return ResponseEntity.ok(updatedGrade);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        try {
            gradeService.deleteGrade(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
