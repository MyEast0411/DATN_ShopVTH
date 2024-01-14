package com.example.shop.repositories;

import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


public interface ChiTietSanPhamRepository extends JpaRepository<SanPhamChiTiet, String> {
    @Query(value = "SELECT b.ma, b.ten AS ten_san_pham, SUM(a.so_luong_ton) AS so_luong_ton, a.trang_thai\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "WHERE b.deleted = 1 and a.deleted = 1\n" +
            "GROUP BY b.ma, b.ten, a.trang_thai\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000", nativeQuery = true)
    List<Object[]> loadTable();

    @Query(value = "select a.*\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "where b.ma = :ma and a.deleted = 1", nativeQuery = true)
    List<SanPhamChiTiet> getByMa(@Param("ma") String ma);

    @Query(value = "select * from san_pham_chi_tiet\n" +
            "where ma = :ma", nativeQuery = true)
    SanPhamChiTiet findByMa(@Param("ma") String ma);

    @Query(value = "select MAX(ma) from san_pham_chi_tiet", nativeQuery = true)
    String findMaxMa();

    @Query(value = "SELECT *\n" +
            "FROM san_pham_chi_tiet\n" +
            "WHERE trang_thai = :trang_thai AND deleted = 1 AND (\n" +
            "  (id_chat_lieu = :id_chat_lieu OR :id_chat_lieu IS NULL OR :id_chat_lieu = '')\n" +
            "  AND (id_thuong_hieu = :id_thuong_hieu OR :id_thuong_hieu IS NULL OR :id_thuong_hieu = '')\n" +
            "  AND (id_de_giay = :id_de_giay OR :id_de_giay IS NULL OR :id_de_giay = '')\n" +
            "  AND (id_kich_co = :id_kich_co OR :id_kich_co IS NULL OR :id_kich_co = '')\n" +
            "  AND (id_mau_sac = :id_mau_sac OR :id_mau_sac IS NULL OR :id_mau_sac = '')\n" +
            "  AND (id_nhan_hieu = :id_nhan_hieu OR :id_nhan_hieu IS NULL OR :id_nhan_hieu = '')\n" +
        ")", nativeQuery = true)
    List<SanPhamChiTiet> filterSPCT(
            @Param("id_chat_lieu") String id_chat_lieu,
            @Param("id_thuong_hieu") String id_thuong_hieu,
            @Param("id_de_giay") String id_de_giay,
            @Param("id_kich_co") String id_kich_co,
            @Param("id_mau_sac") String id_mau_sac,
            @Param("id_nhan_hieu") String id_nhan_hieu,
            @Param("trang_thai") Integer trangThai
    );


    //---------------Hội----------------//
    @Query(value = "SELECT c FROM SanPhamChiTiet c JOIN c.id_san_pham s WHERE s.ma IN :maList and c.deleted = 1")
    List<SanPhamChiTiet> getSanPhamChiTietByMaList(@Param("maList") List<String> maList);
    @Query(value = "select c from SanPhamChiTiet c where c.ma in :maList and c.deleted = 1")
    List<SanPhamChiTiet> getSanPhamChiTietByMaListSPCT(@Param("maList") List<String> maList);
    @Query(value = "SELECT * FROM san_pham_chi_tiet  WHERE ma IN :maList and deleted = 1", nativeQuery = true)
    List<SanPhamChiTiet> getSPCTByMaSPCT(@Param("maList") List<String> maList);

    @Query(value = "select * from san_pham_chi_tiet where san_pham_chi_tiet.id_san_pham = :idSP and deleted = 1", nativeQuery = true)
    List<SanPhamChiTiet> getAllSanPhamChiTietByIdSanPham(@Param("idSP") String idSP);

    @Query(value = "SELECT x FROM SanPhamChiTiet x where x.id_san_pham.id = :id")
    List<SanPhamChiTiet> getSanPhamChiTietByIdSanPham(@Param("id") String id);

    @Query(value = "SELECT s FROM SanPhamChiTiet s WHERE s.id IN :idList and s.deleted = 1")
    List<SanPhamChiTiet> getAllSanPhamChiTietByIdList(@Param("idList") List<String> idList);


    @Query(value = "select * from san_pham_chi_tiet where default_img = :urlImg and deleted = 1",nativeQuery = true)
    List<SanPhamChiTiet> getSanPhamChiTietByDefaultImg(@Param("urlImg") String urlImg);
    //---------------Hội----------------//


    @Query(value = "select * from  san_pham_chi_tiet where so_luong_ton <= 10" , nativeQuery = true)
    List<SanPhamChiTiet> getAllSPCTMin();


}
