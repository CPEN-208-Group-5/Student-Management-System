package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lecturer_tas", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LecturerTA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecturer_id", nullable = false)
    private Lecturer lecturer;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ta_id", nullable = false)
    private TA ta;
} 