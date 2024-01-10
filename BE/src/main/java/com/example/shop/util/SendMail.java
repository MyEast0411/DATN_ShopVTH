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
    public static void SenMail(String toMail, String maHoaDon,String thoiGianNhanHang, String phiShip, String tongTien, List<HoaDonChiTiet> list) {
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
                    "<p>Đây là mã hóa đơn để bạn theo dõi đơn hàng : "+ maHoaDon +"</p>" +
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
//            DataSource source = new FileDataSource("C:\\Users\\NGUYEN VAN HOI\\OneDrive\\Hình ảnh\\Saved Pictures\\logo.png");
//            imageBodyPart.setDataHandler(new DataHandler(source));
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
    public static void sendMailNhanVien(String toMail, String pass) {
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
            message.setSubject("Tạo tài khoản shop VTH thành công !!!");

            String htmlBody = "<html>"
                    + "<head>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; background-color: #007bff; color: #ffffff; padding: 20px; }"
                    + ".container { max-width: 600px; margin: 0 auto; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 4px; padding: 20px; }"
                    + "h1 { text-align: center; color: #000000; }"
                    + "img.logo { display: block; margin: 0 auto; }"
                    + ".form-group { text-align: center; }"
                    + "label { display: block; font-weight: bold; margin-bottom: 5px; }"
                    + "input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }"
                    + "button { background-color: #0056b3; color: #fff; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }"
                    + "button:hover { background-color: #003d80; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<h1> Shop VTH</h1>"
                    + "<form>"
                    + "<div class='form-group'>"
                    + "<label for='username'>Tài khoản :&nbsp;" + toMail + " </label>"
                    + "</div>"
                    + "<div class='form-group'>"
                    + "<label for='password'>Mật khẩu :&nbsp;" + pass + "</label>"
                    + "</div>"
                    + "</form>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlBodyPart);

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
            message.setSubject("THÔNG TIN CỦA BẠN LÀ !!!");

            String htmlBody = contentBody;
            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

//            MimeBodyPart imageBodyPart = new MimeBodyPart();
//            DataSource source = new FileDataSource("C:\\Users\\Admin\\Pictures\\Saved Pictures\\logo.png");
            //Hoi
            //DataSource source = new FileDataSource("C:\\Users\\NGUYEN VAN HOI\\OneDrive\\Hình ảnh\\Saved Pictures\\logo.png");
//            DataSource source = new FileDataSource("C:\\Users\\Admin\\Desktop\\chup-anh-dep-bang-dien-thoai-25.jpg");

//            imageBodyPart.setDataHandler(new DataHandler(source));
//            imageBodyPart.setFileName("Hóa đơn của bạn");
//            imageBodyPart.setHeader("Content-ID", "<image_cid>");


            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlBodyPart);
//            multipart.addBodyPart(imageBodyPart);

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