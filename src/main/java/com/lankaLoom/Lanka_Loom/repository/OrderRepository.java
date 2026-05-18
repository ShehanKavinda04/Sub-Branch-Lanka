package com.lankaLoom.Lanka_Loom.repository;

import com.lankaLoom.Lanka_Loom.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
