package com.lankaLoom.Lanka_Loom.service;

import com.lankaLoom.Lanka_Loom.dto.DashboardStatsDTO;
import com.lankaLoom.Lanka_Loom.dto.ChartDataDTO;
import com.lankaLoom.Lanka_Loom.model.*;
import com.lankaLoom.Lanka_Loom.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;
    private final DisputeRepository disputeRepository;
    private final UserRepository userRepository;
    private final BannerRepository bannerRepository;

    public DashboardStatsDTO getStats() {
        Double totalSales = orderRepository.findAll().stream().mapToDouble(Order::getAmount).sum();
        Long newOrders = orderRepository.count();
        Long newSellers = sellerRepository.count();
        Long activeSellers = sellerRepository.findAll().stream().filter(s -> "Active".equals(s.getStatus())).count();
        Long activeProducts = productRepository.findAll().stream().filter(p -> "Active".equals(p.getStatus())).count();
        Long pendingProducts = productRepository.findAll().stream().filter(p -> "Pending Review".equals(p.getStatus())).count();

        return DashboardStatsDTO.builder()
                .totalSales(totalSales)
                .newOrders(newOrders)
                .newSellers(newSellers)
                .activeSellers(activeSellers)
                .activeProducts(activeProducts)
                .pendingProducts(pendingProducts)
                .salesChange(5.2) // Mock change for now
                .ordersChange(10.0)
                .sellersChange(25.0)
                .productsChange(15.0)
                .build();
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Refund> getAllRefunds() {
        return refundRepository.findAll();
    }

    public List<Dispute> getAllDisputes() {
        return disputeRepository.findAll();
    }

    public List<com.lankaLoom.Lanka_Loom.model.User> getAllUsers() {
        return userRepository.findAll();
    }

    public com.lankaLoom.Lanka_Loom.model.User addUser(com.lankaLoom.Lanka_Loom.model.User user) {
        if (user.getStatus() == null) user.setStatus("Active");
        if (user.getRegistrationDate() == null) user.setRegistrationDate(java.time.LocalDate.now().toString());
        return userRepository.save(user);
    }

    public List<ChartDataDTO> getSalesOverTime() {
        // Simple grouping by order date for demo
        return orderRepository.findAll().stream()
                .map(order -> new ChartDataDTO(order.getDate().toString(), order.getAmount()))
                .limit(7) // Last 7 orders
                .toList();
    }

    public List<ChartDataDTO> getTopCategories() {
        return productRepository.findAll().stream()
                .filter(p -> p.getCategory() != null && "Active".equals(p.getStatus()))
                .collect(java.util.stream.Collectors.groupingBy(Product::getCategory, java.util.stream.Collectors.counting()))
                .entrySet().stream()
                .map(entry -> new ChartDataDTO(entry.getKey(), entry.getValue().doubleValue()))
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(5)
                .toList();
    }

    public Seller updateSellerStatus(Long id, String status) {
        Seller seller = sellerRepository.findById(id).orElseThrow(() -> new RuntimeException("Seller not found"));
        seller.setStatus(status);
        return sellerRepository.save(seller);
    }

    public Product updateProductStatus(Long id, String status) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStatus(status);
        return productRepository.save(product);
    }

    public Order addOrder(Order order) {
        if (order.getOrderNumber() == null || order.getOrderNumber().isEmpty()) {
            order.setOrderNumber("#ORD" + (int)(Math.random() * 10000));
        }
        if (order.getDate() == null) {
            order.setDate(java.time.LocalDate.now());
        }
        if (order.getPaymentStatus() == null) order.setPaymentStatus("Unpaid");
        if (order.getOrderStatus() == null) order.setOrderStatus("Pending");
        
        return orderRepository.save(order);
    }

    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }
    
    public Banner addBanner(Banner banner) {
        if (banner.getStatus() == null) banner.setStatus("Pending");
        return bannerRepository.save(banner);
    }
    
    public Banner updateBanner(Long id, Banner updated) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new RuntimeException("Banner not found"));
        banner.setTitle(updated.getTitle());
        banner.setImg(updated.getImg());
        banner.setPeriod(updated.getPeriod());
        banner.setStatus(updated.getStatus());
        return bannerRepository.save(banner);
    }
    
    public void deleteBanner(Long id) {
        bannerRepository.deleteById(id);
    }

    public Dispute updateDisputeStatus(Long id, String status) {
        Dispute dispute = disputeRepository.findById(id).orElseThrow(() -> new RuntimeException("Dispute not found"));
        dispute.setStatus(status);
        return disputeRepository.save(dispute);
    }

    public Dispute makeDisputeDecision(Long id, String outcome) {
        Dispute dispute = disputeRepository.findById(id).orElseThrow(() -> new RuntimeException("Dispute not found"));
        dispute.setStatus("Resolved");
        dispute.setOutcome(outcome);
        return disputeRepository.save(dispute);
    }

    public Dispute updateDisputeComment(Long id, String comment) {
        Dispute dispute = disputeRepository.findById(id).orElseThrow(() -> new RuntimeException("Dispute not found"));
        dispute.setAdminComment(comment);
        return disputeRepository.save(dispute);
    }

    private String getDefaultMessagesJson(Dispute dispute) {
        return "[" +
            "{\"sender\":\"" + (dispute.getBuyerName() != null ? dispute.getBuyerName().replace("\"", "\\\"") : "Buyer") + "\",\"role\":\"Buyer\",\"time\":\"May 16, 2026, 10:15 AM\",\"content\":\"" + (dispute.getReason() != null ? dispute.getReason().replace("\"", "\\\"") : "") + "\",\"type\":\"buyer\"}," +
            "{\"sender\":\"" + (dispute.getSellerName() != null ? dispute.getSellerName().replace("\"", "\\\"") : "Seller") + "\",\"role\":\"Seller\",\"time\":\"May 16, 2026, 2:30 PM\",\"content\":\"We package all items securely in bubble wrap. This damage must have occurred during transit.\",\"type\":\"seller\"}," +
            "{\"sender\":\"System Auto-Escalation\",\"role\":\"System\",\"time\":\"May 17, 2026, 9:00 AM\",\"content\":\"Dispute auto-escalated to admin review due to seller and buyer disagreement.\",\"type\":\"system\"}" +
            "]";
    }

    public Dispute addDisputeMessage(Long id, String content) {
        Dispute dispute = disputeRepository.findById(id).orElseThrow(() -> new RuntimeException("Dispute not found"));
        String json = dispute.getMessagesJson();
        if (json == null || json.trim().isEmpty() || !json.startsWith("[")) {
            json = getDefaultMessagesJson(dispute);
        }
        String timeStr = java.time.LocalDateTime.now()
            .format(java.time.format.DateTimeFormatter.ofPattern("MMM d, yyyy, h:mm a"));
        String newMsg = ",{\"sender\":\"Admin\",\"role\":\"Admin\",\"time\":\"" + timeStr + "\",\"content\":\"" + content.replace("\"", "\\\"") + "\",\"type\":\"admin\"}";
        json = json.substring(0, json.length() - 1) + newMsg + "]";
        dispute.setMessagesJson(json);
        return disputeRepository.save(dispute);
    }
}
