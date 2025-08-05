package com.finalproject.backend.service;

import com.finalproject.backend.entity.LecturerTA;
import com.finalproject.backend.entity.Lecturer;
import com.finalproject.backend.repository.LecturerTARepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LecturerTAService {
    private final LecturerTARepository lecturerTARepository;

    public LecturerTAService(LecturerTARepository lecturerTARepository) {
        this.lecturerTARepository = lecturerTARepository;
    }

    public List<LecturerTA> getAllLecturerTAs() {
        return lecturerTARepository.findAll();
    }

    public Optional<LecturerTA> getLecturerTAById(Long id) {
        return lecturerTARepository.findById(id);
    }

    public List<LecturerTA> getLecturerTAsByLecturer(Lecturer lecturer) {
        return lecturerTARepository.findByLecturer(lecturer);
    }

    public LecturerTA saveLecturerTA(LecturerTA lecturerTA) {
        return lecturerTARepository.save(lecturerTA);
    }

    public void deleteLecturerTA(Long id) {
        lecturerTARepository.deleteById(id);
    }
} 