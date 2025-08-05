package com.finalproject.backend.repository;

import com.finalproject.backend.entity.CourseEnrollment;
import com.finalproject.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Long> {
    List<CourseEnrollment> findByStudent(Student student);
} 