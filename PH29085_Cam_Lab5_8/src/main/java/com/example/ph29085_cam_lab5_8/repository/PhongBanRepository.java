package com.example.ph29085_cam_lab5_8.repository;

import com.example.ph29085_cam_lab5_8.model.PhongBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhongBanRepository extends JpaRepository<PhongBan, String> {
}
