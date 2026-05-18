package com.lankaLoom.Lanka_Loom.controller;

import com.lankaLoom.Lanka_Loom.dto.DashboardStatsDTO;
import com.lankaLoom.Lanka_Loom.dto.ChartDataDTO;
import com.lankaLoom.Lanka_Loom.model.*;
import com.lankaLoom.Lanka_Loom.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend
public class AdminDashboardController {
    private final AdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return adminDashboardService.getStats();
    }

    @GetMapping("/sellers")
    public List<Seller> getSellers() {
        return adminDashboardService.getAllSellers();
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return adminDashboardService.getAllProducts();
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return adminDashboardService.getAllOrders();
    }

    @GetMapping("/refunds")
    public List<Refund> getRefunds() {
        return adminDashboardService.getAllRefunds();
    }

    @GetMapping("/disputes")
    public List<Dispute> getDisputes() {
        return adminDashboardService.getAllDisputes();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return adminDashboardService.getAllUsers();
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return adminDashboardService.addUser(user);
    }

    @GetMapping("/sales-over-time")
    public List<ChartDataDTO> getSalesOverTime() {
        return adminDashboardService.getSalesOverTime();
    }

    @GetMapping("/top-categories")
    public List<ChartDataDTO> getTopCategories() {
        return adminDashboardService.getTopCategories();
    }

    @PutMapping("/sellers/{id}/status")
    public Seller updateSellerStatus(@PathVariable Long id, @RequestBody String status) {
        String cleanStatus = status.replace("\"", "");
        return adminDashboardService.updateSellerStatus(id, cleanStatus);
    }

    @PutMapping("/products/{id}/status")
    public Product updateProductStatus(@PathVariable Long id, @RequestBody String status) {
        // Clean up quotes if sent as JSON string
        String cleanStatus = status.replace("\"", "");
        return adminDashboardService.updateProductStatus(id, cleanStatus);
    }

    @PostMapping("/orders")
    public Order addOrder(@RequestBody Order order) {
        return adminDashboardService.addOrder(order);
    }

    @GetMapping("/banners")
    public List<Banner> getBanners() {
        return adminDashboardService.getAllBanners();
    }

    @PostMapping("/banners")
    public Banner addBanner(@RequestBody Banner banner) {
        return adminDashboardService.addBanner(banner);
    }

    @PutMapping("/banners/{id}")
    public Banner updateBanner(@PathVariable Long id, @RequestBody Banner banner) {
        return adminDashboardService.updateBanner(id, banner);
    }

    @DeleteMapping("/banners/{id}")
    public void deleteBanner(@PathVariable Long id) {
        adminDashboardService.deleteBanner(id);
    }

    @PutMapping("/disputes/{id}/status")
    public Dispute updateDisputeStatus(@PathVariable Long id, @RequestBody String status) {
        String cleanStatus = status.replace("\"", "");
        return adminDashboardService.updateDisputeStatus(id, cleanStatus);
    }

    @PutMapping("/disputes/{id}/decision")
    public Dispute makeDisputeDecision(@PathVariable Long id, @RequestBody String outcome) {
        String cleanOutcome = outcome.replace("\"", "");
        return adminDashboardService.makeDisputeDecision(id, cleanOutcome);
    }
    

    @PutMapping("/disputes/{id}/comment")
    public Dispute updateDisputeComment(@PathVariable Long id, @RequestBody String comment) {
        String cleanComment = comment.replace("\"", "");
        return adminDashboardService.updateDisputeComment(id, cleanComment);
    }

    @PutMapping("/disputes/{id}/message")
    public Dispute addDisputeMessage(@PathVariable Long id, @RequestBody String content) {
        String cleanContent = content.replace("\"", "");
        return adminDashboardService.addDisputeMessage(id, cleanContent);
    }

    @GetMapping("/settings")
    public SystemSettings getSettings() {
        return adminDashboardService.getSystemSettings();
    }

    @PutMapping("/settings")
    public SystemSettings updateSettings(@RequestBody SystemSettings settings) {
        return adminDashboardService.updateSystemSettings(settings);
    }
}
