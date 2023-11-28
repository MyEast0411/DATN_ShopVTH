package com.example.shop.util;

import com.example.shop.entity.HoaDonChiTiet;
import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Properties;

public class SendMail {
    public static void SenMail(String toMail, String thoiGianNhanHang, String phiShip, String tongTien, List<HoaDonChiTiet> list) {
        final String username = "uandcshop111@gmail.com";
        final String password = "hdbepdrofxwmxyyg";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("uandcshop111@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
            message.setSubject("Cảm ơn bạn đã mua hàng ủng hộ chúng tôi !!!");

            String htmlBody = "<html><body>" +
                    "<div style='position: absolute; top: 0; left: 0;'><img src='cid:image_cid' style='width: 200px; height: auto;'></div>" +
                    "<p>Xin chào, Đây là đơn hàng bạn đã đặt </p>" +
                    "<p>Thời gian dự kiến nhận hàng: " + thoiGianNhanHang + "</p>" +
                    "<p>Phí ship: " + phiShip + " VND </p>" +
                    "<p>Tổng tiền: " + tongTien + " VND </p></body></html>" +
                    "<table style='border-collapse: collapse; width: 60%;'>" +
                    "<tr style='border: 1px solid #000;text-align: center;'>" +
                    "<th style='border: 1px solid #000;text-align: center;'>#</th>" +
                    "<th style='border: 1px solid #000;text-align: center;'>Sản phẩm</th>" +
                    "<th style='border: 1px solid #000;text-align: center;'>Kích cỡ</th>" +
                    "<th style='border: 1px solid #000;text-align: center;'>Số lượng</th>" +
                    "<th style='border: 1px solid #000;text-align: center;'>Giá tiền</th>" +
                    "</tr>";

            int index = 1;
            for (HoaDonChiTiet x : list) {
                htmlBody += "<tr style='border: 1px solid #000;'>" +
                        "<td style='border: 1px solid #000;text-align: center;'>" + index + "</td>" +
                        "<td style='border: 1px solid #000;text-align: center;'>" + x.getId_chi_tiet_san_pham().getTen() + "</td>" +
                        "<td style='border: 1px solid #000;text-align: center;'>" + x.getId_chi_tiet_san_pham().getId_kich_co().getTen() + "</td>" +
                        "<td style='border: 1px solid #000;text-align: center;'>" + x.getSoLuong() + "</td>" +
                        "<td style='border: 1px solid #000;text-align: center;'>" + x.getId_chi_tiet_san_pham().getGiaBan() + "</td>" +
                        "</tr>";
                index++;
            }

            htmlBody += "</table></body></html>";


            htmlBody += "</table>";
            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

            MimeBodyPart imageBodyPart = new MimeBodyPart();
//            DataSource source = new FileDataSource("C:\\Users\\Admin\\Pictures\\Saved Pictures\\logo.png");
            //Hoi
            DataSource source = new FileDataSource("C:\\Users\\NGUYEN VAN HOI\\OneDrive\\Hình ảnh\\Saved Pictures\\logo.png");
            imageBodyPart.setDataHandler(new DataHandler(source));
            imageBodyPart.setFileName("Hóa đơn của bạn");
            imageBodyPart.setHeader("Content-ID", "<image_cid>");


            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlBodyPart);
            multipart.addBodyPart(imageBodyPart);

            message.setContent(multipart);
            Transport.send(message);
            System.out.println("Thành công !");
        } catch (AddressException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public static void SendMailOptions(String toMail,String contentBody) {
        final String username = "uandcshop111@gmail.com";
        final String password = "hdbepdrofxwmxyyg";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("uandcshop111@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
            message.setSubject("Cảm ơn bạn đã mua hàng ủng hộ chúng tôi !!!");

            String htmlBody = contentBody;
            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

            MimeBodyPart imageBodyPart = new MimeBodyPart();
//            DataSource source = new FileDataSource("C:\\Users\\Admin\\Pictures\\Saved Pictures\\logo.png");
            //Hoi
            //DataSource source = new FileDataSource("C:\\Users\\NGUYEN VAN HOI\\OneDrive\\Hình ảnh\\Saved Pictures\\logo.png");
            DataSource source = new FileDataSource("C:\\Users\\Admin\\Desktop\\chup-anh-dep-bang-dien-thoai-25.jpg");

            imageBodyPart.setDataHandler(new DataHandler(source));
            imageBodyPart.setFileName("Hóa đơn của bạn");
            imageBodyPart.setHeader("Content-ID", "<image_cid>");


            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlBodyPart);
            multipart.addBodyPart(imageBodyPart);

            message.setContent(multipart);
            Transport.send(message);
            System.out.println("Thành công !");
        } catch (AddressException e) {
            throw new RuntimeException(e);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}