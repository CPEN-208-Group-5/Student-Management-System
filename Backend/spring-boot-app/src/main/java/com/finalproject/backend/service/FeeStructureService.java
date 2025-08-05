package com.finalproject.backend.service;

import com.finalproject.backend.entity.FeeStructure;
import com.finalproject.backend.repository.FeeStructureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeeStructureService {
    private final FeeStructureRepository feeStructureRepository;

    public FeeStructureService(FeeStructureRepository feeStructureRepository) {
        this.feeStructureRepository = feeStructureRepository;
    }

    public List<FeeStructure> getAllFeeStructures() {
        return feeStructureRepository.findAll();
    }

    public Optional<FeeStructure> getFeeStructureByLevel(Integer level) {
        return feeStructureRepository.findByLevel(level);
    }

    public FeeStructure saveFeeStructure(FeeStructure feeStructure) {
        return feeStructureRepository.save(feeStructure);
    }

    public void deleteFeeStructure(Integer level) {
        feeStructureRepository.deleteById(level);
    }
} 