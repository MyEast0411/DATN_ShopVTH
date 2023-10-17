package com.example.shop.repositories;

import com.example.shop.entity.KichCo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface KichCoRepository extends JpaRepository<KichCo, String> {

    KichCo findByTen(String ten);
}
