package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "fee_structure", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeStructure {
    @Id
    private Integer level;
    
    @Column(name = "amount_due", precision = 10, scale = 2)
    private BigDecimal amountDue;
} 