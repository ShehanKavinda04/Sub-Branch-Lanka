package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "banners")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String img;
    private String period;
    private String status;
}
