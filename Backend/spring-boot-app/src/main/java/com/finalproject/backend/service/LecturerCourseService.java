package com.finalproject.backend.service;

import com.finalproject.backend.entity.LecturerCourse;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.repository.LecturerCourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LecturerCourseService {
    private final LecturerCourseRepository lecturerCourseRepository;

    public LecturerCourseService(LecturerCourseRepository lecturerCourseRepository) {
        this.lecturerCourseRepository = lecturerCourseRepository;
    }

    public List<LecturerCourse> getAllLecturerCourses() {
        return lecturerCourseRepository.findAll();
    }

    public Optional<LecturerCourse> getLecturerCourseById(Long id) {
        return lecturerCourseRepository.findById(id);
    }

    public List<LecturerCourse> getLecturerCoursesByLecturer(Lecturer lecturer) {
        return lecturerCourseRepository.findByLecturer(lecturer);
    }

    public LecturerCourse saveLecturerCourse(LecturerCourse lecturerCourse) {
        return lecturerCourseRepository.save(lecturerCourse);
    }

    public void deleteLecturerCourse(Long id) {
        lecturerCourseRepository.deleteById(id);
    }
} 