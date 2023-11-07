package com.example.shop.repositories;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.entity.KhuyenMaiSanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface KhuyenMaiSanPhamChiTietRepository extends JpaRepository<KhuyenMaiSanPhamChiTiet, String> {

    @Query(value = "SELECT *\n" +
            "FROM khuyen_mai_spct kmspct\n" +
            "JOIN khuyen_mai km ON kmspct.id_khuyen_mai = km.id\n" +
            "WHERE km.trang_thai = 'Đang diễn ra' AND km.deleted = '0'\n", nativeQuery = true)
    List<Object[]> findKmspctByActiveKhuyenMai();

}
