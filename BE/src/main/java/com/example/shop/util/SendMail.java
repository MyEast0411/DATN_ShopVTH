package com.example.shop.util;

import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.*;
import jakarta.mail.internet.*;

import java.math.BigDecimal;
import java.util.Properties;

public class SendMail {
    public static void SenMail(String toMail, String thoiGianNhanHang, String phiShip, String tongTien) {
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

            String htmlBody = "<html><body><p>Xin chào, Đây là đơn hàng bạn đã đặt </p>" +
                    "<img src='cid:image_cid'></body></html>" +
                    "<p>Thời gian dự kiến nhận hàng : " + thoiGianNhanHang + "</p>" +
                    "<p>Phí ship : " + phiShip + "</p>" +
                    "<p>Tổng tiền : " + BigDecimal.valueOf(Double.parseDouble(tongTien)) + "</p>";

            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

            MimeBodyPart imageBodyPart = new MimeBodyPart();
            DataSource source = new FileDataSource("C:\\Users\\Admin\\Pictures\\Saved Pictures\\raiden.jpg");
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
