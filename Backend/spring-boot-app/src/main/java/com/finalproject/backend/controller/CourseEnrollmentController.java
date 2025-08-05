package com.finalproject.backend.controller;

import com.finalproject.backend.entity.CourseEnrollment;
import com.finalproject.backend.entity.Student;
import com.finalproject.backend.service.CourseEnrollmentService;
import com.finalproject.backend.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class CourseEnrollmentController {
    private final CourseEnrollmentService enrollmentService;
    private final StudentService studentService;

    public CourseEnrollmentController(CourseEnrollmentService enrollmentService, StudentService studentService) {
        this.enrollmentService = enrollmentService;
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<CourseEnrollment>> getAllEnrollments() {
        List<CourseEnrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseEnrollment> getEnrollmentById(@PathVariable Long id) {
        Optional<CourseEnrollment> enrollment = enrollmentService.getEnrollmentById(id);
        return enrollment.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<CourseEnrollment>> getEnrollmentsByStudent(@PathVariable Long studentId) {
        Optional<Student> student = studentService.getStudentById(studentId);
        if (student.isPresent()) {
            List<CourseEnrollment> enrollments = enrollmentService.getEnrollmentsByStudent(student.get());
            return ResponseEntity.ok(enrollments);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CourseEnrollment> createEnrollment(@RequestBody CourseEnrollment enrollment) {
        CourseEnrollment savedEnrollment = enrollmentService.saveEnrollment(enrollment);
        return ResponseEntity.ok(savedEnrollment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseEnrollment> updateEnrollment(@PathVariable Long id, @RequestBody CourseEnrollment enrollment) {
        Optional<CourseEnrollment> existingEnrollment = enrollmentService.getEnrollmentById(id);
        if (existingEnrollment.isPresent()) {
            enrollment.setId(id);
            CourseEnrollment updatedEnrollment = enrollmentService.saveEnrollment(enrollment);
            return ResponseEntity.ok(updatedEnrollment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        Optional<CourseEnrollment> enrollment = enrollmentService.getEnrollmentById(id);
        if (enrollment.isPresent()) {
            enrollmentService.deleteEnrollment(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 