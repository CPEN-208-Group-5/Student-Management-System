package com.finalproject.backend.controller;

import com.finalproject.backend.entity.LecturerTA;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.service.LecturerTAService;
import com.finalproject.backend.service.LecturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lecturer-tas")
@CrossOrigin(origins = "*")
public class LecturerTAController {
    private final LecturerTAService lecturerTAService;
    private final LecturerService lecturerService;

    public LecturerTAController(LecturerTAService lecturerTAService, LecturerService lecturerService) {
        this.lecturerTAService = lecturerTAService;
        this.lecturerService = lecturerService;
    }

    @GetMapping
    public ResponseEntity<List<LecturerTA>> getAllLecturerTAs() {
        List<LecturerTA> lecturerTAs = lecturerTAService.getAllLecturerTAs();
        return ResponseEntity.ok(lecturerTAs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LecturerTA> getLecturerTAById(@PathVariable Long id) {
        Optional<LecturerTA> lecturerTA = lecturerTAService.getLecturerTAById(id);
        return lecturerTA.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lecturer/{lecturerId}")
    public ResponseEntity<List<LecturerTA>> getLecturerTAsByLecturer(@PathVariable Long lecturerId) {
        Optional<Lecturer> lecturer = lecturerService.getLecturerById(lecturerId);
        if (lecturer.isPresent()) {
            List<LecturerTA> lecturerTAs = lecturerTAService.getLecturerTAsByLecturer(lecturer.get());
            return ResponseEntity.ok(lecturerTAs);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<LecturerTA> createLecturerTA(@RequestBody LecturerTA lecturerTA) {
        LecturerTA savedLecturerTA = lecturerTAService.saveLecturerTA(lecturerTA);
        return ResponseEntity.ok(savedLecturerTA);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LecturerTA> updateLecturerTA(@PathVariable Long id, @RequestBody LecturerTA lecturerTA) {
        Optional<LecturerTA> existingLecturerTA = lecturerTAService.getLecturerTAById(id);
        if (existingLecturerTA.isPresent()) {
            lecturerTA.setId(id);
            LecturerTA updatedLecturerTA = lecturerTAService.saveLecturerTA(lecturerTA);
            return ResponseEntity.ok(updatedLecturerTA);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecturerTA(@PathVariable Long id) {
        Optional<LecturerTA> lecturerTA = lecturerTAService.getLecturerTAById(id);
        if (lecturerTA.isPresent()) {
            lecturerTAService.deleteLecturerTA(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 