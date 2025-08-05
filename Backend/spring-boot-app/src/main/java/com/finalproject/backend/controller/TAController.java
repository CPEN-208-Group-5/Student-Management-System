package com.finalproject.backend.controller;

import com.finalproject.backend.entity.TA;
import com.finalproject.backend.service.TAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tas")
@CrossOrigin(origins = "*")
public class TAController {
    private final TAService taService;

    public TAController(TAService taService) {
        this.taService = taService;
    }

    @GetMapping
    public ResponseEntity<List<TA>> getAllTAs() {
        List<TA> tas = taService.getAllTAs();
        return ResponseEntity.ok(tas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TA> getTAById(@PathVariable Long id) {
        Optional<TA> ta = taService.getTAById(id);
        return ta.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<TA> getTAByEmail(@PathVariable String email) {
        Optional<TA> ta = taService.getTAByEmail(email);
        return ta.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TA> createTA(@RequestBody TA ta) {
        TA savedTA = taService.saveTA(ta);
        return ResponseEntity.ok(savedTA);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TA> updateTA(@PathVariable Long id, @RequestBody TA ta) {
        Optional<TA> existingTA = taService.getTAById(id);
        if (existingTA.isPresent()) {
            ta.setId(id);
            TA updatedTA = taService.saveTA(ta);
            return ResponseEntity.ok(updatedTA);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTA(@PathVariable Long id) {
        Optional<TA> ta = taService.getTAById(id);
        if (ta.isPresent()) {
            taService.deleteTA(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 