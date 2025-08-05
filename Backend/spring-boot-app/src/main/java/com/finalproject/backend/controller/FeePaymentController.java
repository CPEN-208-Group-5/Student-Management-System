package com.finalproject.backend.controller;

import com.finalproject.backend.entity.FeePayment;
import com.finalproject.backend.entity.Student;
import com.finalproject.backend.service.FeePaymentService;
import com.finalproject.backend.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class FeePaymentController {
    private final FeePaymentService paymentService;
    private final StudentService studentService;

    public FeePaymentController(FeePaymentService paymentService, StudentService studentService) {
        this.paymentService = paymentService;
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<FeePayment>> getAllPayments() {
        List<FeePayment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeePayment> getPaymentById(@PathVariable Long id) {
        Optional<FeePayment> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeePayment>> getPaymentsByStudent(@PathVariable Long studentId) {
        Optional<Student> student = studentService.getStudentById(studentId);
        if (student.isPresent()) {
            List<FeePayment> payments = paymentService.getPaymentsByStudent(student.get());
            return ResponseEntity.ok(payments);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<FeePayment> createPayment(@RequestBody FeePayment payment) {
        FeePayment savedPayment = paymentService.savePayment(payment);
        return ResponseEntity.ok(savedPayment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeePayment> updatePayment(@PathVariable Long id, @RequestBody FeePayment payment) {
        Optional<FeePayment> existingPayment = paymentService.getPaymentById(id);
        if (existingPayment.isPresent()) {
            payment.setId(id);
            FeePayment updatedPayment = paymentService.savePayment(payment);
            return ResponseEntity.ok(updatedPayment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        Optional<FeePayment> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            paymentService.deletePayment(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 