package com.finalproject.backend.repository;

import com.finalproject.backend.entity.LecturerTA;
import com.finalproject.backend.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LecturerTARepository extends JpaRepository<LecturerTA, Long> {
    List<LecturerTA> findByLecturer(Lecturer lecturer);
} 