package com.finalproject.backend.repository;

import com.finalproject.backend.entity.FeePayment;
import com.finalproject.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
    List<FeePayment> findByStudent(Student student);
} 