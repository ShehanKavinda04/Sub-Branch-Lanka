package com.lankaLoom.Lanka_Loom.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "system_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String siteTitle;
    private String tagline;
    private String adminEmail;
    private String logoUrl;
    private boolean maintenanceMode;
    private boolean cachingEnabled;
    private String defaultCurrency;
    private String defaultLanguage;
    private String timeZone;
}
