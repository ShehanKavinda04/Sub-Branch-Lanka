package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "sellers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String status; // Active, Pending, Suspend
    private Double totalSales;
    private Integer productsCount;
    private LocalDate registrationDate;
    private String imageUrl;
}
