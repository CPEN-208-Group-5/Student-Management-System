package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fee_payments", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @Column(name = "amount_paid", precision = 10, scale = 2)
    private BigDecimal amountPaid;
    
    @Column(name = "payment_date")
    private LocalDate paymentDate;
} 