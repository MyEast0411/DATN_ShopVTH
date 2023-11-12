package com.example.shop.services;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.repositories.KhuyenMaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Service
public class KhuyenMaiService {
    @Autowired
    KhuyenMaiRepository khuyenMaiRepo;

    public List<KhuyenMai> findAll() {
        return khuyenMaiRepo.findAll();
    }


    @Query(value = "SELECT * FROM khuyen_mai k " +
            "WHERE (:ngayBatDau BETWEEN k.ngay_bat_dau AND k.ngay_ket_thuc " +
            "OR :ngayKetThuc BETWEEN k.ngay_bat_dau AND k.ngay_ket_thuc) " +
            "AND k.deleted = 0", nativeQuery = true)
    public List<KhuyenMai> findOverlappingPromotions(Date ngayBatDau, Date ngayKetThuc) {
        return khuyenMaiRepo.findOverlappingPromotions(ngayBatDau, ngayKetThuc);
    }

    @Query(value = "   SELECT *\n" +
            "FROM khuyen_mai k\n" +
            "WHERE k.ngay_bat_dau >= :ngayBatDau AND k.ngay_ket_thuc <= :ngayKetThuc\n" +
            "  AND k.deleted = 0", nativeQuery = true)
    public List<KhuyenMai> searchByDate(String ngayBatDau, String ngayKetThuc) {
        return khuyenMaiRepo.searchByDate(ngayBatDau, ngayKetThuc);
    }



    public KhuyenMai findByMa(String ma) {
        return khuyenMaiRepo.findByMa(ma);
    }

    @Query(value = "SELECT * FROM khuyen_mai k WHERE k.deleted = 0 ORDER BY k.trang_thai = 'Đang diễn ra' DESC, k.ngay_sua DESC", nativeQuery = true)
    public List<KhuyenMai> findAllByDeleted() {
        return khuyenMaiRepo.findAllByDeleted();
    }

    public void flush() {
        khuyenMaiRepo.flush();
    }

    public <S extends KhuyenMai> S saveAndFlush(S entity) {
        return khuyenMaiRepo.saveAndFlush(entity);
    }

    public <S extends KhuyenMai> List<S> saveAllAndFlush(Iterable<S> entities) {
        return khuyenMaiRepo.saveAllAndFlush(entities);
    }

    @Deprecated
    public void deleteInBatch(Iterable<KhuyenMai> entities) {
        khuyenMaiRepo.deleteInBatch(entities);
    }

    public void deleteAllInBatch(Iterable<KhuyenMai> entities) {
        khuyenMaiRepo.deleteAllInBatch(entities);
    }

    public void deleteAllByIdInBatch(Iterable<String> strings) {
        khuyenMaiRepo.deleteAllByIdInBatch(strings);
    }

    public void deleteAllInBatch() {
        khuyenMaiRepo.deleteAllInBatch();
    }

    @Deprecated
    public KhuyenMai getOne(String s) {
        return khuyenMaiRepo.getOne(s);
    }

    @Deprecated
    public KhuyenMai getById(String s) {
        return khuyenMaiRepo.getById(s);
    }

    public KhuyenMai getReferenceById(String s) {
        return khuyenMaiRepo.getReferenceById(s);
    }

    public <S extends KhuyenMai> List<S> findAll(Example<S> example) {
        return khuyenMaiRepo.findAll(example);
    }

    public <S extends KhuyenMai> List<S> findAll(Example<S> example, Sort sort) {
        return khuyenMaiRepo.findAll(example, sort);
    }

    public <S extends KhuyenMai> List<S> saveAll(Iterable<S> entities) {
        return khuyenMaiRepo.saveAll(entities);
    }

    public List<KhuyenMai> findAllById(Iterable<String> strings) {
        return khuyenMaiRepo.findAllById(strings);
    }

    public <S extends KhuyenMai> S save(S entity) {
        return khuyenMaiRepo.save(entity);
    }

    public Optional<KhuyenMai> findById(String s) {
        return khuyenMaiRepo.findById(s);
    }

    public boolean existsById(String s) {
        return khuyenMaiRepo.existsById(s);
    }

    public long count() {
        return khuyenMaiRepo.count();
    }

    public void deleteById(String s) {
        khuyenMaiRepo.deleteById(s);
    }

    public void delete(KhuyenMai entity) {
        khuyenMaiRepo.delete(entity);
    }

    public void deleteAllById(Iterable<? extends String> strings) {
        khuyenMaiRepo.deleteAllById(strings);
    }

    public void deleteAll(Iterable<? extends KhuyenMai> entities) {
        khuyenMaiRepo.deleteAll(entities);
    }

    public void deleteAll() {
        khuyenMaiRepo.deleteAll();
    }

    public List<KhuyenMai> findAll(Sort sort) {
        return khuyenMaiRepo.findAll(sort);
    }

    public Page<KhuyenMai> findAll(Pageable pageable) {
        return khuyenMaiRepo.findAll(pageable);
    }

    public <S extends KhuyenMai> Optional<S> findOne(Example<S> example) {
        return khuyenMaiRepo.findOne(example);
    }

    public <S extends KhuyenMai> Page<S> findAll(Example<S> example, Pageable pageable) {
        return khuyenMaiRepo.findAll(example, pageable);
    }

    public <S extends KhuyenMai> long count(Example<S> example) {
        return khuyenMaiRepo.count(example);
    }

    public <S extends KhuyenMai> boolean exists(Example<S> example) {
        return khuyenMaiRepo.exists(example);
    }

    public <S extends KhuyenMai, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return khuyenMaiRepo.findBy(example, queryFunction);
    }
}