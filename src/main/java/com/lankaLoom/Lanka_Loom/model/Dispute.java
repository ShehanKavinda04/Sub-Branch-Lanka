package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "disputes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dispute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String disputeNumber; // e.g., "#1234"
    private String reason;
    private String itemName;
    private String buyerName;
    private String sellerName;
    private String orderNumber;
    private String status; // Pending, Escalated, Resolved
    private String outcome;
    private String adminComment;
    @Column(length = 3000)
    private String messagesJson;
}
