package com.finalproject.backend.controller;

import com.finalproject.backend.entity.LecturerCourse;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.service.LecturerCourseService;
import com.finalproject.backend.service.LecturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lecturer-courses")
@CrossOrigin(origins = "*")
public class LecturerCourseController {
    private final LecturerCourseService lecturerCourseService;
    private final LecturerService lecturerService;

    public LecturerCourseController(LecturerCourseService lecturerCourseService, LecturerService lecturerService) {
        this.lecturerCourseService = lecturerCourseService;
        this.lecturerService = lecturerService;
    }

    @GetMapping
    public ResponseEntity<List<LecturerCourse>> getAllLecturerCourses() {
        List<LecturerCourse> lecturerCourses = lecturerCourseService.getAllLecturerCourses();
        return ResponseEntity.ok(lecturerCourses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LecturerCourse> getLecturerCourseById(@PathVariable Long id) {
        Optional<LecturerCourse> lecturerCourse = lecturerCourseService.getLecturerCourseById(id);
        return lecturerCourse.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lecturer/{lecturerId}")
    public ResponseEntity<List<LecturerCourse>> getLecturerCoursesByLecturer(@PathVariable Long lecturerId) {
        Optional<Lecturer> lecturer = lecturerService.getLecturerById(lecturerId);
        if (lecturer.isPresent()) {
            List<LecturerCourse> lecturerCourses = lecturerCourseService.getLecturerCoursesByLecturer(lecturer.get());
            return ResponseEntity.ok(lecturerCourses);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<LecturerCourse> createLecturerCourse(@RequestBody LecturerCourse lecturerCourse) {
        LecturerCourse savedLecturerCourse = lecturerCourseService.saveLecturerCourse(lecturerCourse);
        return ResponseEntity.ok(savedLecturerCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LecturerCourse> updateLecturerCourse(@PathVariable Long id, @RequestBody LecturerCourse lecturerCourse) {
        Optional<LecturerCourse> existingLecturerCourse = lecturerCourseService.getLecturerCourseById(id);
        if (existingLecturerCourse.isPresent()) {
            lecturerCourse.setId(id);
            LecturerCourse updatedLecturerCourse = lecturerCourseService.saveLecturerCourse(lecturerCourse);
            return ResponseEntity.ok(updatedLecturerCourse);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecturerCourse(@PathVariable Long id) {
        Optional<LecturerCourse> lecturerCourse = lecturerCourseService.getLecturerCourseById(id);
        if (lecturerCourse.isPresent()) {
            lecturerCourseService.deleteLecturerCourse(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 