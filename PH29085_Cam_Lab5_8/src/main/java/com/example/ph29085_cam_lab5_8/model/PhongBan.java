package com.example.ph29085_cam_lab5_8.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "phong_ban")
public class PhongBan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String ten;
    private String ma;

}
