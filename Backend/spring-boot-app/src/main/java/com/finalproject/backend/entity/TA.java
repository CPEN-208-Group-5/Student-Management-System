package com.finalproject.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tas", schema = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ta_id")
    private Long id;

    @Column(name = "first_name", length = 100)
    private String firstName;
    
    @Column(name = "last_name", length = 100)
    private String lastName;
    
    @Column(unique = true, nullable = false, length = 100)
    private String email;
    
    private Integer level;
} 