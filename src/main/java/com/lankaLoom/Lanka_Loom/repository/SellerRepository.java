package com.lankaLoom.Lanka_Loom.repository;

import com.lankaLoom.Lanka_Loom.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
}
