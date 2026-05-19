package com.lankaLoom.Lanka_Loom.config;

import com.lankaLoom.Lanka_Loom.model.*;
import com.lankaLoom.Lanka_Loom.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;
    private final DisputeRepository disputeRepository;
    private final UserRepository userRepository;
    private final BannerRepository bannerRepository;

    @Override
    public void run(String... args) {
        sellerRepository.deleteAll();
        productRepository.deleteAll();
        orderRepository.deleteAll();
        refundRepository.deleteAll();
        disputeRepository.deleteAll();
        userRepository.deleteAll();
        bannerRepository.deleteAll();

        if (sellerRepository.count() == 0) {
            sellerRepository.save(Seller.builder().name("Crafty Hand").status("Active").totalSales(57000.0).productsCount(3).registrationDate(LocalDate.now().minusDays(10)).build());
            sellerRepository.save(Seller.builder().name("Silk Waves").status("Active").totalSales(44500.0).productsCount(5).registrationDate(LocalDate.now().minusDays(12)).build());
            sellerRepository.save(Seller.builder().name("Wood Art").status("Active").totalSales(43000.0).productsCount(2).registrationDate(LocalDate.now().minusDays(15)).build());
            sellerRepository.save(Seller.builder().name("Island Gems").status("Pending").totalSales(18500.0).productsCount(4).registrationDate(LocalDate.now().minusDays(20)).build());
            sellerRepository.save(Seller.builder().name("Jewel Craft").status("Suspend").totalSales(0.0).productsCount(1).registrationDate(LocalDate.now().minusDays(5)).build());
        }

        if (productRepository.count() == 0) {
            // Pottery: 3 products
            productRepository.save(Product.builder().name("Hand-painted Ceramic Vase").sku("SKU-001").price(2500.0).stock(12).status("Active").sellerName("Crafty Hand").submissionDate(LocalDate.now()).category("Pottery").build());
            productRepository.save(Product.builder().name("Clay Tea Set").sku("SKU-006").price(3500.0).stock(5).status("Active").sellerName("Crafty Hand").submissionDate(LocalDate.now()).category("Pottery").build());
            productRepository.save(Product.builder().name("Terracotta Bowl").sku("SKU-007").price(1200.0).stock(20).status("Active").sellerName("Crafty Hand").submissionDate(LocalDate.now()).category("Pottery").build());

            // Clothing: 5 products
            productRepository.save(Product.builder().name("Batik Print Silk Saree").sku("SKU-002").price(12500.0).stock(5).status("Pending Review").sellerName("Silk Waves").submissionDate(LocalDate.now()).category("Clothing").build());
            productRepository.save(Product.builder().name("Handloom Cotton Sarong").sku("SKU-008").price(2500.0).stock(15).status("Active").sellerName("Silk Waves").submissionDate(LocalDate.now()).category("Clothing").build());
            productRepository.save(Product.builder().name("Embroidered Tunic").sku("SKU-009").price(4500.0).stock(10).status("Active").sellerName("Silk Waves").submissionDate(LocalDate.now()).category("Clothing").build());
            productRepository.save(Product.builder().name("Silk Scarf").sku("SKU-010").price(3000.0).stock(8).status("Active").sellerName("Silk Waves").submissionDate(LocalDate.now()).category("Clothing").build());
            productRepository.save(Product.builder().name("Linen Shirt").sku("SKU-011").price(5500.0).stock(12).status("Active").sellerName("Silk Waves").submissionDate(LocalDate.now()).category("Clothing").build());

            // Art: 2 products
            productRepository.save(Product.builder().name("Carved Wooden Elephant").sku("SKU-003").price(4500.0).stock(8).status("Active").sellerName("Wood Art").submissionDate(LocalDate.now()).category("Art").build());
            productRepository.save(Product.builder().name("Oil Painting - Rural Life").sku("SKU-012").price(15000.0).stock(1).status("Active").sellerName("Wood Art").submissionDate(LocalDate.now()).category("Art").build());

            // Home: 4 products
            productRepository.save(Product.builder().name("Handwoven Reed Basket").sku("SKU-004").price(1500.0).stock(20).status("Active").sellerName("Island Gems").submissionDate(LocalDate.now()).category("Home").build());
            productRepository.save(Product.builder().name("Coir Door Mat").sku("SKU-013").price(800.0).stock(50).status("Active").sellerName("Island Gems").submissionDate(LocalDate.now()).category("Home").build());
            productRepository.save(Product.builder().name("Bamboo Lamp Shade").sku("SKU-014").price(2200.0).stock(10).status("Active").sellerName("Island Gems").submissionDate(LocalDate.now()).category("Home").build());
            productRepository.save(Product.builder().name("Cushion Cover").sku("SKU-015").price(1200.0).stock(30).status("Active").sellerName("Island Gems").submissionDate(LocalDate.now()).category("Home").build());

            // Jewelry: 1 product
            productRepository.save(Product.builder().name("Silver Filigree Earrings").sku("SKU-005").price(8500.0).stock(10).status("Active").sellerName("Jewel Craft").submissionDate(LocalDate.now()).category("Jewelry").build());
        }

        if (orderRepository.count() == 0) {
            // Today (2 orders)
            orderRepository.save(Order.builder().orderNumber("#ORD1234").date(LocalDate.now()).buyerName("Ayodya Senavirathne").sellerName("Crafty Hand").amount(42000.0).paymentStatus("Paid").orderStatus("Completed").build());
            orderRepository.save(Order.builder().orderNumber("#ORD4567").date(LocalDate.now()).buyerName("Ayodya Senavirathne").sellerName("Silk Waves").amount(12500.0).paymentStatus("Unpaid").orderStatus("Pending").build());
            
            // Last 7 Days (2 orders)
            orderRepository.save(Order.builder().orderNumber("#ORD7890").date(LocalDate.now().minusDays(3)).buyerName("John Doe").sellerName("Crafty Hand").amount(15000.0).paymentStatus("Paid").orderStatus("Completed").build());
            orderRepository.save(Order.builder().orderNumber("#ORD3456").date(LocalDate.now().minusDays(5)).buyerName("Jane Smith").sellerName("Wood Art").amount(28000.0).paymentStatus("Paid").orderStatus("Completed").build());
            
            // This Month but > 7 days (2 orders)
            orderRepository.save(Order.builder().orderNumber("#ORD9012").date(LocalDate.now().minusDays(12)).buyerName("Robert Brown").sellerName("Silk Waves").amount(32000.0).paymentStatus("Paid").orderStatus("Completed").build());
            orderRepository.save(Order.builder().orderNumber("#ORD5678").date(LocalDate.now().minusDays(20)).buyerName("Ayodya Senavirathne").sellerName("Island Gems").amount(18500.0).paymentStatus("Paid").orderStatus("Completed").build());
            
            // This Year but > 1 month (2 orders)
            orderRepository.save(Order.builder().orderNumber("#ORD1111").date(LocalDate.now().minusDays(45)).buyerName("John Doe").sellerName("Wood Art").amount(25000.0).paymentStatus("Paid").orderStatus("Completed").build());
            orderRepository.save(Order.builder().orderNumber("#ORD2222").date(LocalDate.now().minusDays(80)).buyerName("Jane Smith").sellerName("Crafty Hand").amount(19000.0).paymentStatus("Paid").orderStatus("Completed").build());
            
            // Last Year (1 order)
            orderRepository.save(Order.builder().orderNumber("#ORD9999").date(LocalDate.now().minusYears(1)).buyerName("Robert Brown").sellerName("Silk Waves").amount(60000.0).paymentStatus("Paid").orderStatus("Completed").build());
        }

        if (refundRepository.count() == 0) {
            refundRepository.save(Refund.builder().orderNumber("#1234").productName("Hand-Painted Ceramic Vase").customerName("Ayodya Senavirathne").amount(25000.0).requestTime(LocalDateTime.now()).status("New").build());
            refundRepository.save(Refund.builder().orderNumber("#5678").productName("Batik Silk Saree").customerName("Shehan Kavinda").amount(32000.0).requestTime(LocalDateTime.now().minusHours(2)).status("New").build());

            refundRepository.save(Refund.builder().orderNumber("#1111").productName("Engraved Wooden Mask").customerName("John Doe").amount(14500.0).requestTime(LocalDateTime.now().minusDays(1)).status("Under Review").build());
            refundRepository.save(Refund.builder().orderNumber("#2222").productName("Silver Filigree Necklace").customerName("Jane Smith").amount(45000.0).requestTime(LocalDateTime.now().minusDays(2)).status("Under Review").build());
            refundRepository.save(Refund.builder().orderNumber("#3333").productName("Traditional Clay Pot").customerName("Kavya Bandara").amount(3500.0).requestTime(LocalDateTime.now().minusDays(3)).status("Under Review").build());
            refundRepository.save(Refund.builder().orderNumber("#4444").productName("Lace Tablecloth").customerName("Nimal Silva").amount(12000.0).requestTime(LocalDateTime.now().minusDays(4)).status("Under Review").build());

            refundRepository.save(Refund.builder().orderNumber("#5555").productName("Sapphire Ring").customerName("Saman Bandara").amount(85000.0).requestTime(LocalDateTime.now().minusDays(5)).status("Awaiting Seller Action").build());
        }

        if (disputeRepository.count() == 0) {
            disputeRepository.save(Dispute.builder()
                .disputeNumber("#1234")
                .reason("Item not as described")
                .itemName("Hand-Painted Ceramic Vase")
                .buyerName("Ayodya Senavirathne")
                .sellerName("Silk Waves")
                .orderNumber("#ORD1234")
                .status("Pending")
                .outcome("Full Refund")
                .messagesJson("[{\"sender\":\"Ayodya Senavirathne\",\"role\":\"Buyer\",\"time\":\"May 16, 2026, 10:15 AM\",\"content\":\"The ceramic vase arrived with multiple cracks on the side. The packaging was completely torn.\",\"type\":\"buyer\"},{\"sender\":\"Silk Waves\",\"role\":\"Seller\",\"time\":\"May 16, 2026, 2:30 PM\",\"content\":\"We package all items securely in bubble wrap. This damage must have occurred during transit.\",\"type\":\"seller\"},{\"sender\":\"System Auto-Escalation\",\"role\":\"System\",\"time\":\"May 17, 2026, 9:00 AM\",\"content\":\"Dispute auto-escalated to admin review due to seller and buyer disagreement.\",\"type\":\"system\"}]")
                .build());

            disputeRepository.save(Dispute.builder()
                .disputeNumber("#5678")
                .reason("Late delivery and damaged packaging")
                .itemName("Clay Tea Set")
                .buyerName("John Doe")
                .sellerName("Crafty Hand")
                .orderNumber("#ORD7890")
                .status("Escalated")
                .outcome("Replacement")
                .messagesJson("[{\"sender\":\"John Doe\",\"role\":\"Buyer\",\"time\":\"May 14, 2026, 11:30 AM\",\"content\":\"The Clay Tea Set is missing two of the cups, and one of the saucers is chipped.\",\"type\":\"buyer\"},{\"sender\":\"Crafty Hand\",\"role\":\"Seller\",\"time\":\"May 14, 2026, 4:10 PM\",\"content\":\"I shipped all pieces in perfect condition. Please check if they fell out inside the main box.\",\"type\":\"seller\"},{\"sender\":\"System Auto-Escalation\",\"role\":\"System\",\"time\":\"May 15, 2026, 8:45 AM\",\"content\":\"Dispute auto-escalated to admin review due to seller and buyer disagreement.\",\"type\":\"system\"}]")
                .build());

            disputeRepository.save(Dispute.builder()
                .disputeNumber("#9012")
                .reason("Different size than advertised")
                .itemName("Carved Wooden Elephant")
                .buyerName("Jane Smith")
                .sellerName("Wood Art")
                .orderNumber("#ORD3456")
                .status("Resolved")
                .outcome("Full Refund")
                .messagesJson("[{\"sender\":\"Jane Smith\",\"role\":\"Buyer\",\"time\":\"May 10, 2026, 3:20 PM\",\"content\":\"The wooden carving is much smaller than the described dimensions. It was supposed to be 12 inches but it is barely 6 inches.\",\"type\":\"buyer\"},{\"sender\":\"Wood Art\",\"role\":\"Seller\",\"time\":\"May 10, 2026, 5:15 PM\",\"content\":\"My apologies. We might have sent the medium size instead of the large size by mistake.\",\"type\":\"seller\"},{\"sender\":\"System Auto-Escalation\",\"role\":\"System\",\"time\":\"May 11, 2026, 10:00 AM\",\"content\":\"Dispute auto-escalated to admin review due to seller and buyer disagreement.\",\"type\":\"system\"}]")
                .build());

            disputeRepository.save(Dispute.builder()
                .disputeNumber("#3456")
                .reason("Incorrect item sent")
                .itemName("Batik Print Silk Saree")
                .buyerName("Robert Brown")
                .sellerName("Silk Waves")
                .orderNumber("#ORD9012")
                .status("Resolved")
                .outcome("Dismissed")
                .messagesJson("[{\"sender\":\"Robert Brown\",\"role\":\"Buyer\",\"time\":\"May 12, 2026, 9:00 AM\",\"content\":\"The silk saree material feels cheap and synthetic. I believe it is polyester, not authentic silk.\",\"type\":\"buyer\"},{\"sender\":\"Silk Waves\",\"role\":\"Seller\",\"time\":\"May 12, 2026, 1:40 PM\",\"content\":\"All our sarees are made from 100% pure Mulberry silk. We have certified testing reports.\",\"type\":\"seller\"},{\"sender\":\"System Auto-Escalation\",\"role\":\"System\",\"time\":\"May 13, 2026, 11:15 AM\",\"content\":\"Dispute auto-escalated to admin review due to seller and buyer disagreement.\",\"type\":\"system\"}]")
                .build());
        }

        if (userRepository.count() == 0) {
            userRepository.save(User.builder().name("Ayodya Senavirathne").email("admin@lankacraft.lk").role("Admin").status("Active").registrationDate(LocalDate.now().toString()).build());
            userRepository.save(User.builder().name("John Doe").email("john@example.com").role("Buyer").status("Active").registrationDate(LocalDate.now().minusDays(4).toString()).build());
            userRepository.save(User.builder().name("Jane Smith").email("jane@example.com").role("Seller").status("Active").registrationDate(LocalDate.now().minusDays(15).toString()).build());
            userRepository.save(User.builder().name("Robert Brown").email("robert@example.com").role("Buyer").status("Inactive").registrationDate(LocalDate.now().minusDays(50).toString()).build());
            userRepository.save(User.builder().name("Alice Freeman").email("alice@example.com").role("Buyer").status("Active").registrationDate(LocalDate.now().minusYears(1).toString()).build());
        }

        if (bannerRepository.count() == 0) {
            bannerRepository.save(Banner.builder().title("Summer Sale 2026").img("bannerSale").period("Jun 1 - Jun 30").status("Active").build());
            bannerRepository.save(Banner.builder().title("New Arrivals - Sarees").img("sareeImg").period("Jul 1 - Jul 15").status("Pending").build());
            bannerRepository.save(Banner.builder().title("Holiday Special Offers").img("vaseImg").period("Dec 1 - Dec 31").status("Inactive").build());
            bannerRepository.save(Banner.builder().title("Handcrafted Wood Sale").img("elephantImg").period("Aug 1 - Aug 31").status("Pending").build());
        }
    }
}
