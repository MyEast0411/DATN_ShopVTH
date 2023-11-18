package com.example.shop.repositories;

import com.example.shop.entity.HoaDon;
import org.hibernate.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    @Query("select u from HoaDon u where u.trangThai = ?1 and u.deleted =0")
    List<HoaDon> getPage(int trangThai );

    @Query("select u from HoaDon u where u.trangThai = 7 and u.deleted = 0")
    List<HoaDon> getHDChuaTT();

    @Query("select u from HoaDon u where u.deleted = 0")
    List<HoaDon> getPageDeleted( );

    HoaDon getHoaDonByMa(String ma);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM shopvth.hoa_don",nativeQuery = true)
    String getMaxMa();

    @Query(value = "select sum(hd.tong_tien) from hoa_don hd where month(hd.ngay_nhan) = ?1  and hd.deleted = 0",nativeQuery = true)
    Double  getTotalByThang(int thang);


}
