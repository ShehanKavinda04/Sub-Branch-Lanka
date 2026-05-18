package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refunds")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    private String productName;
    private String customerName;
    private Double amount;
    private LocalDateTime requestTime;
    private String status; // New, Under Review, Awaiting Seller Action
}
