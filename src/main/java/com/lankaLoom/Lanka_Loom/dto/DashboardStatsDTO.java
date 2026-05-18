package com.lankaLoom.Lanka_Loom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    private Double totalSales;
    private Long newOrders;
    private Long newSellers;
    private Long activeSellers;
    private Long activeProducts;
    private Long pendingProducts;
    private Double salesChange; // Percentage
    private Double ordersChange;
    private Double sellersChange;
    private Double productsChange;
}
