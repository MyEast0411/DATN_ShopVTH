package com.example.ph29085_cam_lab5_8.repository;

import com.example.ph29085_cam_lab5_8.model.ChucVu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ChucVuRepository extends JpaRepository<ChucVu , String> {

    @Query("select u from ChucVu u where u.ngayTao > ?1 and u.ngayTao < ?2 ")
    Page<ChucVu> searchNgayTao(Date ngayBD , Date ngayKT , Pageable pageable);

}
