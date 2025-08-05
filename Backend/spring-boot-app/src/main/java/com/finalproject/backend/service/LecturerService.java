package com.finalproject.backend.service;

import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.repository.LecturerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LecturerService {
    private final LecturerRepository lecturerRepository;

    public LecturerService(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    public Optional<Lecturer> getLecturerById(Long id) {
        return lecturerRepository.findById(id);
    }

    public Optional<Lecturer> getLecturerByEmail(String email) {
        return lecturerRepository.findByEmail(email);
    }

    public Lecturer saveLecturer(Lecturer lecturer) {
        return lecturerRepository.save(lecturer);
    }

    public void deleteLecturer(Long id) {
        lecturerRepository.deleteById(id);
    }
} 