package com.finalproject.backend.controller;

import com.finalproject.backend.entity.FeeStructure;
import com.finalproject.backend.service.FeeStructureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fee-structures")
@CrossOrigin(origins = "*")
public class FeeStructureController {
    private final FeeStructureService feeStructureService;

    public FeeStructureController(FeeStructureService feeStructureService) {
        this.feeStructureService = feeStructureService;
    }

    @GetMapping
    public ResponseEntity<List<FeeStructure>> getAllFeeStructures() {
        List<FeeStructure> feeStructures = feeStructureService.getAllFeeStructures();
        return ResponseEntity.ok(feeStructures);
    }

    @GetMapping("/{level}")
    public ResponseEntity<FeeStructure> getFeeStructureByLevel(@PathVariable Integer level) {
        Optional<FeeStructure> feeStructure = feeStructureService.getFeeStructureByLevel(level);
        return feeStructure.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FeeStructure> createFeeStructure(@RequestBody FeeStructure feeStructure) {
        FeeStructure savedFeeStructure = feeStructureService.saveFeeStructure(feeStructure);
        return ResponseEntity.ok(savedFeeStructure);
    }

    @PutMapping("/{level}")
    public ResponseEntity<FeeStructure> updateFeeStructure(@PathVariable Integer level, @RequestBody FeeStructure feeStructure) {
        Optional<FeeStructure> existingFeeStructure = feeStructureService.getFeeStructureByLevel(level);
        if (existingFeeStructure.isPresent()) {
            feeStructure.setLevel(level);
            FeeStructure updatedFeeStructure = feeStructureService.saveFeeStructure(feeStructure);
            return ResponseEntity.ok(updatedFeeStructure);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{level}")
    public ResponseEntity<Void> deleteFeeStructure(@PathVariable Integer level) {
        Optional<FeeStructure> feeStructure = feeStructureService.getFeeStructureByLevel(level);
        if (feeStructure.isPresent()) {
            feeStructureService.deleteFeeStructure(level);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 