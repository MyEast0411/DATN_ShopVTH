package com.example.shop.repositories;

import com.example.shop.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HinhAnhRepository extends JpaRepository<HinhAnh,String> {
    @Query(value = "SELECT * FROM hinh_anh\n" +
            "where mau_sac = :mau_sac and ma is not null",nativeQuery = true)
    List<HinhAnh> getHinhAnhByMau(@Param("mau_sac")String mauSac);

    @Query(value = "SELECT * FROM hinh_anh\n" +
            "where ma is not null",nativeQuery = true)
    List<HinhAnh> getAll();

    @Query(value = "SELECT MAX(substr(ma,3)) FROM hinh_anh",nativeQuery = true)
    String getMaxMa();

    @Query(value = "SELECT hinh_anh.*\n" +
            "FROM san_pham_chi_tiet\n" +
            "JOIN hinh_anh ON san_pham_chi_tiet.id = hinh_anh.id_san_pham_chi_tiet\n" +
            "WHERE san_pham_chi_tiet.id = :id", nativeQuery = true)
    List<HinhAnh> getHinhAnhByIdSPCT(@Param("id") String id);

    //-------Hội------------//
    @Query(value = "SELECT hinh_anh.*\n" +
            "FROM san_pham_chi_tiet\n" +
            "JOIN hinh_anh ON san_pham_chi_tiet.id = hinh_anh.id_san_pham_chi_tiet\n" +
            "WHERE san_pham_chi_tiet.id =  :idSanPhamChiTiet", nativeQuery = true)
    List<HinhAnh> getHinhAnhBySanPhamChiTiet(@Param("idSanPhamChiTiet") String idSanPhamChiTiet);

    //-------Hội------------//
}
