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
    @Query(value = "select * from hoa_don_chi_tiet u where u.id_hoa_don = ?1" , nativeQuery = true)
    List<HoaDonChiTiet> getHDCT(String idHD);
    @Modifying
    @Transactional
    @Query(value = "delete from hoa_don_chi_tiet u where u.id_hoa_don = :idHD and u.id_chi_tiet_san_pham = :idSPCT", nativeQuery = true)
    void deleteHDCT(@Param("idHD") String idHD , @Param("idSPCT")String idSPCT );

    @Query("select u from HoaDonChiTiet u where u.id_hoa_don.ma = ?1")
    List<HoaDonChiTiet> getHDCTByMA(String maHD);
    @Query(value = "select sum(b.so_luong) as so_luong\n" +
            "from hoa_don a join hoa_don_chi_tiet b\n" +
            "on a.id = b.id_hoa_don\n" +
            "where a.trang_thai = 7 and a.deleted = 1 and a.ma = :ma\n" +
            "group by a.ma,a.id_khach_hang,a.id_nhan_vien,a.loai_hd,a.trang_thai",nativeQuery = true)
    Integer getSLSP(@Param("ma")String ma);

    @Query(value = "SELECT id_chi_tiet_san_pham, SUM(so_luong) AS total_quantity\n" +
            "FROM hoa_don_chi_tiet\n" +
            "GROUP BY id_chi_tiet_san_pham\n" +
            "order by total_quantity desc \n" +
            " limit 3 " , nativeQuery = true)
    List<Object[]> top3SP();

    @Query(value ="SELECT  count(id_chi_tiet_san_pham) FROM hoa_don_chi_tiet" , nativeQuery = true)
    Integer totalSPSaled();






}
