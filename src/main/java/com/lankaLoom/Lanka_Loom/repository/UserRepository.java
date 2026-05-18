package com.lankaLoom.Lanka_Loom.repository;

import com.lankaLoom.Lanka_Loom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
