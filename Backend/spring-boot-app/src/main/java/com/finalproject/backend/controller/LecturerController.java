package com.finalproject.backend.controller;

import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.service.LecturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lecturers")
@CrossOrigin(origins = "*")
public class LecturerController {
    private final LecturerService lecturerService;

    public LecturerController(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    @GetMapping
    public ResponseEntity<List<Lecturer>> getAllLecturers() {
        List<Lecturer> lecturers = lecturerService.getAllLecturers();
        return ResponseEntity.ok(lecturers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getLecturerById(@PathVariable Long id) {
        Optional<Lecturer> lecturer = lecturerService.getLecturerById(id);
        return lecturer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Lecturer> getLecturerByEmail(@PathVariable String email) {
        Optional<Lecturer> lecturer = lecturerService.getLecturerByEmail(email);
        return lecturer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Lecturer> createLecturer(@RequestBody Lecturer lecturer) {
        Lecturer savedLecturer = lecturerService.saveLecturer(lecturer);
        return ResponseEntity.ok(savedLecturer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lecturer> updateLecturer(@PathVariable Long id, @RequestBody Lecturer lecturer) {
        Optional<Lecturer> existingLecturer = lecturerService.getLecturerById(id);
        if (existingLecturer.isPresent()) {
            lecturer.setId(id);
            Lecturer updatedLecturer = lecturerService.saveLecturer(lecturer);
            return ResponseEntity.ok(updatedLecturer);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecturer(@PathVariable Long id) {
        Optional<Lecturer> lecturer = lecturerService.getLecturerById(id);
        if (lecturer.isPresent()) {
            lecturerService.deleteLecturer(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 