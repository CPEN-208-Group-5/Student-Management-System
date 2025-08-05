package com.finalproject.backend.repository;

import com.finalproject.backend.entity.LecturerCourse;
import com.finalproject.backend.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LecturerCourseRepository extends JpaRepository<LecturerCourse, Long> {
    List<LecturerCourse> findByLecturer(Lecturer lecturer);
} 