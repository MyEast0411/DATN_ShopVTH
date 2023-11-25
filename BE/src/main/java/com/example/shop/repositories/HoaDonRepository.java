package com.example.shop.repositories;

import com.example.shop.entity.HoaDon;
import org.hibernate.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    @Query(value = "select * from hoa_don u where u.trang_thai = ?1 and u.deleted =1 order by u.ngay_tao desc" , nativeQuery = true)
    List<HoaDon> getPage(int trangThai );

    @Query("select u from HoaDon u where u.trangThai = 7 and u.deleted = 1")
    List<HoaDon> getHDChuaTT();

    @Query(value = "select * from hoa_don u where u.deleted = 1 order by u.ngay_tao desc", nativeQuery = true)
    List<HoaDon> getPageDeleted();

    HoaDon getHoaDonByMa(String ma);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM shopvth.hoa_don",nativeQuery = true)
    String getMaxMa();

    @Query(value = "select sum(hd.tong_tien) from hoa_don hd where month(hd.ngay_nhan) = ?1  and hd.deleted = 1",nativeQuery = true)
    Double  getTotalByThang(int thang);
    @Query(value = "select sum(hd.tong_tien) from hoa_don hd ",nativeQuery = true)
    Double  getTotalAll();

    @Query(value = "SELECT*FROM hoa_don\n" +
            "order by ngay_tao desc\n" +
            "LIMIT 5; ",nativeQuery = true)
    List<HoaDon>  top5HDMoi();

    @Query(value = "SELECT SUM(tong_tien) FROM hoa_don\n" +
            "WHERE ngay_tao >= ?1 AND ngay_tao <= ?2;",nativeQuery = true)
    Double  getTotalTuanTheoThang(Date ngayBD , Date ngayKT);

    @Query(value = "select count(*)  from hoa_don  where trang_thai != 6;",nativeQuery = true)
    Integer  countHD();


}
