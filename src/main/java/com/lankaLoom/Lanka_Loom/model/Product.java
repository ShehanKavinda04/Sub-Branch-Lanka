package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String sku;
    private Double price;
    private Integer stock;
    private String status; // Active, Pending Review, Out of Stock, Draft
    private String sellerName;
    private LocalDate submissionDate;
    private String imageUrl;
    private String category;
}
