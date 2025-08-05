package com.finalproject.backend.service;

import com.finalproject.backend.entity.FeePayment;
import com.finalproject.backend.entity.Student;
import com.finalproject.backend.repository.FeePaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeePaymentService {
    private final FeePaymentRepository paymentRepository;

    public FeePaymentService(FeePaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<FeePayment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<FeePayment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public List<FeePayment> getPaymentsByStudent(Student student) {
        return paymentRepository.findByStudent(student);
    }

    public FeePayment savePayment(FeePayment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
} 