package com.finalproject.backend.repository;

import com.finalproject.backend.entity.FeeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeeStructureRepository extends JpaRepository<FeeStructure, Integer> {
    Optional<FeeStructure> findByLevel(Integer level);
} 