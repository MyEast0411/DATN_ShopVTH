package com.example.shop.repositories;

import com.example.shop.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    @Query("select u from HoaDon u where u.trangThai = ?1 and u.deleted =0")
    List<HoaDon> getPage(int trangThai );

    @Query("select u from HoaDon u where u.deleted = 0")
    List<HoaDon> getPageDeleted( );
}