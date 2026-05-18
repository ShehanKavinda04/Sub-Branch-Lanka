package com.lankaLoom.Lanka_Loom.repository;

import com.lankaLoom.Lanka_Loom.model.Dispute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {
}
