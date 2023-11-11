package com.example.shop.repositories;

import com.example.shop.entity.LichSuHoaDon;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, String> {
        @Query("select u  from LichSuHoaDon u where u.id_hoa_don.id= ?1" )
                List<LichSuHoaDon> getLichSuHoaDon(String id , Sort sort);
}
