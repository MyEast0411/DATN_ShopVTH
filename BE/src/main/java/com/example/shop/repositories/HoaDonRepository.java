package com.example.shop.repositories;

import com.example.shop.entity.HoaDon;
import com.example.shop.response.ThongKeSoLuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, String> {

    @Query(value = "select * from hoa_don u where u.trang_thai = ?1 and u.deleted =1 order by u.ngay_tao desc" , nativeQuery = true)
    List<HoaDon> getPage(int trangThai);

    @Query(value = "select a.ma,a.id_khach_hang,a.id_nhan_vien,sum(b.so_luong) as so_luong,a.loai_hd,a.trang_thai\n" +
            "from hoa_don a join hoa_don_chi_tiet b on a.id = b.id_hoa_don\n" +
            "where a.trang_thai = 7 and a.deleted = 1\n" +
            "group by a.ma,a.id_khach_hang,a.id_nhan_vien,a.loai_hd,a.trang_thai",nativeQuery = true)
    List<Object[]> getHDChuaTT();
    @Query(value = "select sum(gia_tien) as tong_tien from hoa_don a \n" +
            "    join hoa_don_chi_tiet b on a.id = b.id_hoa_don \n" +
            "    where a.ma = :ma \n" +
            "    group by a.ma",nativeQuery = true)
    Double getTongTien(@Param("ma")String ma);

    @Query(value = "select tong_tien from hoa_don where ma = :ma", nativeQuery = true)
    Double getTotalPriceInBill(@Param("ma")String ma);

    @Query(value = "select id_chi_tiet_san_pham,so_luong from hoa_don_chi_tiet hdct\n" +
            "where hdct.id_hoa_don = :idHD",nativeQuery = true)
    List<Object[]> getHDCTByMaHD(@Param("idHD")String idHD);
    @Query(value = "select * from hoa_don u where u.deleted = 1 order by u.ngay_tao desc", nativeQuery = true)
    List<HoaDon> getPageDeleted();

    HoaDon getHoaDonByMa(String ma);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM hoa_don",nativeQuery = true)
    String getMaxMa();

    @Query(value = "select sum(hd.tong_tien) from hoa_don hd where month(hd.ngay_tao) = ?1  and hd.deleted = 1",nativeQuery = true)
    Double  getTotalByThang(int thang);
    @Query(value = "select sum(hd.tong_tien) from hoa_don hd ",nativeQuery = true)
    Double  getTotalAll();

    @Query(value = "SELECT*FROM hoa_don\n" +
            "order by ngay_tao desc\n" +
            "LIMIT 5; ",nativeQuery = true)
    List<HoaDon>  top5HDMoi();

    @Query(value = "SELECT SUM(tong_tien) FROM hoa_don\n" +
            "WHERE ngay_tao >= :ngayBD AND ngay_tao <= :ngayKT",nativeQuery = true)
    Double  getTotalTuanTheoThang(@Param("ngayBD")String ngayBD , @Param("ngayKT")String ngayKT);

    @Query(value = "select count(*)  from hoa_don  where trang_thai != 6;",nativeQuery = true)
    Integer  countHD();

    @Query(value = "SELECT SUM(tong_tien) FROM hoa_don\n" +
            "WHERE ngay_tao like :ngayTao",nativeQuery = true)
    Double  getDayInWeek(@Param("ngayTao")String ngayTao );

    @Query(value = "select * from hoa_don\n" +
            "where id_khach_hang = :idKH order by ngay_tao desc",nativeQuery = true)
    List<HoaDon>  getHDByKH(@Param("idKH")String idKH );

    @Query(value = "SELECT hoa_don.* FROM hoa_don JOIN voucher ON hoa_don.id_voucher = voucher.id WHERE voucher.id = :id",nativeQuery = true)
    List<HoaDon>  getHdByIdVoucher(@Param("id")String id );




    @Query(value = " select * from hoa_don where id_voucher = :id_voucher ",nativeQuery = true)
    List<HoaDon> getHoaDonByVoucher(@Param("id_voucher")String id_voucher);

    @Query(value = "SELECT * FROM hoa_don hd\n" +
            "WHERE (hd.trang_thai = 4 OR hd.trang_thai = 5)\n" +
            "AND DATEDIFF(CURDATE(), hd.ngay_nhan) <= 7\n" +
            "AND hd.ma = :maHD\n" +
            "AND hd.deleted = 1;", nativeQuery = true)
    HoaDon findHDDoiTra(@Param("maHD") String ma);

    @Query(value = "SELECT trang_thai, COUNT(*) AS so_luong FROM hoa_don  where deleted = 1 GROUP BY trang_thai ORDER BY trang_thai", nativeQuery = true)
    List<ThongKeSoLuong> getSLHDByTT();

//    @Query(value = "SELECT \n" +
//            "   \n" +
//            "    trang_thai,\n" +
//            "    COUNT(*) AS count\n" +
//            "FROM \n" +
//            "    hoa_don\n" +
//            "GROUP BY \n" +
//            "    trang_thai\n" +
//            "ORDER BY \n" +
//            "    trang_thai;", nativeQuery = true)
//    Double getMoneyBYHD(@Param("id_hd") String idHD);





}
