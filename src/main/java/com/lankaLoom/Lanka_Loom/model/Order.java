package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber; // e.g., "#ORD1234"
    private LocalDate date;
    private String buyerName;
    private String sellerName;
    private Double amount;
    private String paymentStatus; // Paid, Unpaid
    private String orderStatus; // Completed, Pending, Cancelled
}
