package com.example.shop.services;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.repositories.KhuyenMaiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Service
public class KhuyenMaiService {
    @Autowired
    KhuyenMaiRepo khuyenMaiRepo;


    public <S extends KhuyenMai> List<S> saveAll(Iterable<S> entities) {
        return khuyenMaiRepo.saveAll(entities);
    }

    public List<KhuyenMai> findAll() {
        return khuyenMaiRepo.findAll();
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

    public void deleteAllByIdInBatch(Iterable<UUID> uuids) {
        khuyenMaiRepo.deleteAllByIdInBatch(uuids);
    }

    public void deleteAllInBatch() {
        khuyenMaiRepo.deleteAllInBatch();
    }

    @Deprecated
    public KhuyenMai getOne(UUID uuid) {
        return khuyenMaiRepo.getOne(uuid);
    }

    @Deprecated
    public KhuyenMai getById(UUID uuid) {
        return khuyenMaiRepo.getById(uuid);
    }

    public KhuyenMai getReferenceById(UUID uuid) {
        return khuyenMaiRepo.getReferenceById(uuid);
    }

    public <S extends KhuyenMai> List<S> findAll(Example<S> example) {
        return khuyenMaiRepo.findAll(example);
    }

    public <S extends KhuyenMai> List<S> findAll(Example<S> example, Sort sort) {
        return khuyenMaiRepo.findAll(example, sort);
    }

    public List<KhuyenMai> findAllById(Iterable<UUID> uuids) {
        return khuyenMaiRepo.findAllById(uuids);
    }

    public <S extends KhuyenMai> S save(S entity) {
        return khuyenMaiRepo.save(entity);
    }

    public boolean existsById(UUID uuid) {
        return khuyenMaiRepo.existsById(uuid);
    }

    public long count() {
        return khuyenMaiRepo.count();
    }

    public void deleteById(UUID uuid) {
        khuyenMaiRepo.deleteById(uuid);
    }

    public void delete(KhuyenMai entity) {
        khuyenMaiRepo.delete(entity);
    }

    public void deleteAllById(Iterable<? extends UUID> uuids) {
        khuyenMaiRepo.deleteAllById(uuids);
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

    public Optional<KhuyenMai> findById(UUID uuid) {
        return khuyenMaiRepo.findById(uuid);
    }
}
