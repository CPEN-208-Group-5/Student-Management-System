package com.finalproject.backend.service;

import com.finalproject.backend.entity.TA;
import com.finalproject.backend.repository.TARepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TAService {
    private final TARepository taRepository;

    public TAService(TARepository taRepository) {
        this.taRepository = taRepository;
    }

    public List<TA> getAllTAs() {
        return taRepository.findAll();
    }

    public Optional<TA> getTAById(Long id) {
        return taRepository.findById(id);
    }

    public Optional<TA> getTAByEmail(String email) {
        return taRepository.findByEmail(email);
    }

    public TA saveTA(TA ta) {
        return taRepository.save(ta);
    }

    public void deleteTA(Long id) {
        taRepository.deleteById(id);
    }
} 