package com.example.shop.service.impl;


import com.example.shop.entity.Voucher;

import com.example.shop.repository.VoucherRepository;
import com.example.shop.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;


    @Override
    public List<Voucher> getVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public Voucher getVoucher(String id) {
        return voucherRepository.findById(id).orElse(null);
    }

    @Override
    public Voucher addVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public Boolean deleteVoucher(Voucher voucher) {
        try {
            voucherRepository.delete(voucher);
            return true;
        }catch (Exception exception){
            exception.printStackTrace();
            return false;
        }
    }
}
