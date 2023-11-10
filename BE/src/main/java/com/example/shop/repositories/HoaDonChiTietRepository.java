package com.example.shop.repositories;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet , String> {
    @Query("select u from HoaDonChiTiet u where u.id_hoa_don.id = ?1")
    List<HoaDonChiTiet> getHDCT(String idHD );
    @Modifying
    @Transactional
    @Query(value = "delete from hoa_don_chi_tiet u where u.id_hoa_don = :idHD and u.id_chi_tiet_san_pham = :idSPCT", nativeQuery = true)
    void deleteHDCT(@Param("idHD") String idHD , @Param("idSPCT")String idSPCT );
}
