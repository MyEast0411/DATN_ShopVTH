package com.example.shop.repositories;

import com.example.shop.entity.SanPham;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.response.FilterSanPhamResponse;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


public interface ChiTietSanPhamRepository extends JpaRepository<SanPhamChiTiet, String> {
    @Query(value = "SELECT b.ma, b.ten AS ten_san_pham, SUM(a.so_luong_ton) AS so_luong_ton, b.deleted\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
//            "WHERE b.deleted = 1 and a.deleted = 1\n" +
            "GROUP BY b.ma, b.ten, b.deleted\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000", nativeQuery = true)
    List<Object[]> loadTable();
    @Query(value = "SELECT * FROM san_pham_chi_tiet where deleted = 1", nativeQuery = true)
    List<SanPhamChiTiet> getAllSPCTDangBan();
    @Query(value = "SELECT b.ma AS maSanPham, b.ten AS tenSanPham, SUM(a.so_luong_ton) AS soLuongTon, b.deleted AS status\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "WHERE b.deleted = :status OR b.ma = :ma OR b.ten = :ten\n" +
            "GROUP BY b.ma, b.ten, b.deleted\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000", nativeQuery = true)
    List<FilterSanPhamResponse> filterSanPham(@Param("ma") String ma, @Param("ten")String ten,@Param("status")Integer status);

    @Query(value = "SELECT b.ma AS maSanPham, b.ten AS tenSanPham, SUM(a.so_luong_ton) AS soLuongTon, b.deleted AS status\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "WHERE b.deleted = :status OR b.ma = :ma OR b.ten = :ten\n" +
            "GROUP BY b.ma, b.ten, b.deleted\n" +
            "HAVING soLuongTon >= :soLuongTon - 10 AND soLuongTon <= :soLuongTon + 10\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000", nativeQuery = true)
    List<FilterSanPhamResponse> filterSanPhamBySoLuongTon(@Param("ma") String ma, @Param("ten")String ten,@Param("status")Integer status, @Param("soLuongTon")Integer soLuongTon);

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
    @Query(value = "select * from san_pham_chi_tiet where deleted = 1 and ma = :ma", nativeQuery = true)
    SanPhamChiTiet findSanPhamDangBan(@Param("ma")String ma);
    @Query(value = "SELECT *\n" +
            "FROM san_pham_chi_tiet\n" +
            "WHERE trang_thai = :trang_thai AND deleted = 1 AND id_san_pham = :id_san_pham AND (\n" +
            "  (id_chat_lieu = :id_chat_lieu OR :id_chat_lieu IS NULL OR :id_chat_lieu = '')\n" +
            "  AND (id_thuong_hieu = :id_thuong_hieu OR :id_thuong_hieu IS NULL OR :id_thuong_hieu = '')\n" +
            "  AND (id_de_giay = :id_de_giay OR :id_de_giay IS NULL OR :id_de_giay = '')\n" +
            "  AND (id_kich_co = :id_kich_co OR :id_kich_co IS NULL OR :id_kich_co = '')\n" +
            "  AND (id_mau_sac = :id_mau_sac OR :id_mau_sac IS NULL OR :id_mau_sac = '')\n" +
            "  AND (id_the_loai = :id_the_loai OR :id_the_loai IS NULL OR :id_the_loai = '')\n" +
        ")", nativeQuery = true)
    List<SanPhamChiTiet> filterSPCT(
            @Param("id_chat_lieu") String id_chat_lieu,
            @Param("id_thuong_hieu") String id_thuong_hieu,
            @Param("id_de_giay") String id_de_giay,
            @Param("id_kich_co") String id_kich_co,
            @Param("id_mau_sac") String id_mau_sac,
            @Param("id_the_loai") String id_the_loai,
            @Param("trang_thai") Integer trangThai,
            @Param("id_san_pham") String id_san_pham
    );

    @Query(value = "SELECT * " +
            "FROM san_pham_chi_tiet " +
            "WHERE trang_thai = :trang_thai AND deleted = 1 AND id_san_pham = :id_san_pham AND " +
            "((gia_ban >= :fromPrice - 50000 AND gia_ban <= :toPrice + 50000) OR :fromPrice IS NULL OR :toPrice IS NULL) AND " +
            "((id_chat_lieu = :id_chat_lieu OR :id_chat_lieu IS NULL OR :id_chat_lieu = '') " +
            "AND (id_thuong_hieu = :id_thuong_hieu OR :id_thuong_hieu IS NULL OR :id_thuong_hieu = '') " +
            "AND (id_de_giay = :id_de_giay OR :id_de_giay IS NULL OR :id_de_giay = '') " +
            "AND (id_kich_co = :id_kich_co OR :id_kich_co IS NULL OR :id_kich_co = '') " +
            "AND (id_mau_sac = :id_mau_sac OR :id_mau_sac IS NULL OR :id_mau_sac = '') " +
            "AND (id_the_loai = :id_the_loai OR :id_the_loai IS NULL OR :id_the_loai = ''))", nativeQuery = true)
    List<SanPhamChiTiet> filterSPCTByPrice(
            @Param("id_chat_lieu") String id_chat_lieu,
            @Param("id_thuong_hieu") String id_thuong_hieu,
            @Param("id_de_giay") String id_de_giay,
            @Param("id_kich_co") String id_kich_co,
            @Param("id_mau_sac") String id_mau_sac,
            @Param("id_the_loai") String id_the_loai,
            @Param("trang_thai") Integer trangThai,
            @Param("id_san_pham") String id_san_pham,
            @Param("fromPrice") Double fromPrice,
            @Param("toPrice") Double toPrice
    );



//    @Query(value = """
//        SELECT b
//        FROM SanPhamChiTiet a
//        JOIN SanPham b ON a.id_san_pham = b.id
//        WHERE b.deleted = 1
//        AND ((a.giaBan >= :toPrice AND a.giaBan <= :fromPrice) OR :toPrice IS NULL OR :fromPrice IS NULL)
//        OR (a.id_mau_sac in :id_mau_sac)
//        OR (a.id_thuong_hieu in :id_thuong_hieu)
//        OR (a.id_the_loai in :id_the_loai)
//    """)
//    List<SanPham> filterSanPhamClient(
//            @Param("id_thuong_hieu") List<String> id_thuong_hieu,
//            @Param("id_mau_sac") List<String> id_mau_sac,
//            @Param("id_the_loai") List<String> id_the_loai,
//            @Param("fromPrice") Double price,
//            @Param("toPrice") Double toPrice
//    );


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
