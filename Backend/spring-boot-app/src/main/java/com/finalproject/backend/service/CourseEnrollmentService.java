package com.finalproject.backend.service;

import com.finalproject.backend.entity.CourseEnrollment;
import com.finalproject.backend.entity.Student;
import com.finalproject.backend.repository.CourseEnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseEnrollmentService {
    private final CourseEnrollmentRepository enrollmentRepository;

    public CourseEnrollmentService(CourseEnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<CourseEnrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Optional<CourseEnrollment> getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id);
    }

    public List<CourseEnrollment> getEnrollmentsByStudent(Student student) {
        return enrollmentRepository.findByStudent(student);
    }

    public CourseEnrollment saveEnrollment(CourseEnrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }
} 