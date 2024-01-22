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
    public static void main(String[] args) {
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
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("donglun0411@gmail.com"));
            message.setSubject("Cảm ơn bạn đã mua hàng ủng hộ chúng tôi !!!");

            String htmlBody = "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\">\n" +
                    "    <title>SHOP JORDAN VTH</title>\n" +
                    "    <style>\n" +
                    "        @import url(\"https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\");\n" +
                    "\n" +
                    "        /* Base Styles */\n" +
                    "        html {\n" +
                    "            font-family: \"Be Vietnam Pro\", sans-serif;\n" +
                    "            color: #000;\n" +
                    "        }\n" +
                    "\n" +
                    "        body {\n" +
                    "            margin: 0;\n" +
                    "            padding: 0;\n" +
                    "            box-sizing: border-box;\n" +
                    "        }\n" +
                    "\n" +
                    "        img {\n" +
                    "            max-width: 100%;\n" +
                    "            display: block;\n" +
                    "        }\n" +
                    "\n" +
                    "        li {\n" +
                    "            list-style: none;\n" +
                    "            text-decoration: none;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* Utility Classes */\n" +
                    "        .bg-blue {\n" +
                    "            background-color: #00AEDF;\n" +
                    "        }\n" +
                    "\n" +
                    "        .w-600 {\n" +
                    "            width: 600px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .rounded {\n" +
                    "            border-radius: 0.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .mx-auto {\n" +
                    "            margin-left: auto;\n" +
                    "            margin-right: auto;\n" +
                    "        }\n" +
                    "\n" +
                    "        .bg-white {\n" +
                    "            background-color: #fff;\n" +
                    "        }\n" +
                    "\n" +
                    "        .container {\n" +
                    "            padding-left: 1rem;\n" +
                    "            padding-right: 1rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .flex {\n" +
                    "            display: flex;\n" +
                    "        }\n" +
                    "\n" +
                    "        .items-center {\n" +
                    "            align-items: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .justify-center {\n" +
                    "            justify-content: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .font-bold {\n" +
                    "            font-weight: 700;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-2xl {\n" +
                    "            font-size: 1.5rem;\n" +
                    "            line-height: 2rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-25px {\n" +
                    "            font-size: 1.5625rem;\n" +
                    "            line-height: 2rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .image {\n" +
                    "            height: 100%;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-center {\n" +
                    "            text-align: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .py-5 {\n" +
                    "            padding-top: 1.25rem;\n" +
                    "            padding-bottom: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .p-5 {\n" +
                    "            padding: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .max-h-80 {\n" +
                    "            max-height: 5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .object-cover {\n" +
                    "            object-fit: cover;\n" +
                    "        }\n" +
                    "\n" +
                    "        .px-10 {\n" +
                    "            padding-left: 2.5rem;\n" +
                    "            padding-right: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .pb-5 {\n" +
                    "            padding-bottom: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .pb-10 {\n" +
                    "            padding-bottom: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .hover-bg-green:hover,\n" +
                    "        .bg-green {\n" +
                    "            background-color: #61BD4F;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-white {\n" +
                    "            color: #fff;\n" +
                    "        }\n" +
                    "\n" +
                    "        .px-40 {\n" +
                    "            padding-left: 2.5rem;\n" +
                    "            padding-right: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .py-5px {\n" +
                    "            padding-top: 0.3125rem;\n" +
                    "            padding-bottom: 0.3125rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-xl {\n" +
                    "            font-size: 1.25rem;\n" +
                    "            line-height: 1.75rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .inline-flex {\n" +
                    "            display: inline-flex;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* Remaining Tailwind CSS Classes with Appropriate Names */\n" +
                    "        .justify-center-items {\n" +
                    "            justify-content: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-gray {\n" +
                    "            color: #afb3be;\n" +
                    "        }\n" +
                    "\n" +
                    "        .phone-info {\n" +
                    "            width: 350px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .contact-info {\n" +
                    "            color: #afb3be;\n" +
                    "            padding-top: 2.5rem;\n" +
                    "            display: flex;\n" +
                    "            justify-content: space-between;\n" +
                    "        }\n" +
                    "\n" +
                    "        .footer-links {\n" +
                    "            padding-top: 2.5rem;\n" +
                    "            padding-bottom: 2.5rem;\n" +
                    "            display: flex;\n" +
                    "            justify-content: flex-start;\n" +
                    "        }\n" +
                    "\n" +
                    "        .footer-link {\n" +
                    "            font-size: 0.875rem;\n" +
                    "            line-height: 1.25rem;\n" +
                    "            padding-left: 3.125rem;\n" +
                    "            padding-right: 3.125rem;\n" +
                    "            border-right-width: 2px;\n" +
                    "            cursor: pointer;\n" +
                    "        }\n" +
                    "\n" +
                    "        .button:hover {\n" +
                    "            background: #49a736;\n" +
                    "        }\n" +
                    "\n" +
                    "        .container-img {\n" +
                    "            height: 360px !important;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body class=\"bg-blue\">\n" +
                    "    <div id=\"root\" class=\"w-600 rounded mx-auto bg-white m-5\">\n" +
                    "        <div class=\"container\">\n" +
                    "            <div class=\"flex items-center justify-center\">\n" +
                    "                <img class=\"w-40\" src=\"https://i.ibb.co/y8KrZXX/logo.png\" alt=\"\">\n" +
                    "                <div class=\"font-bold text-2xl\">Jordan VTH</div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"text-25px text-center font-bold py-5\">Cảm ơn bạn đã mua sắm tại Jordan VTH!</div>\n" +
                    "            <div class=\"p-5 container-img\">\n" +
                    "                <img class=\"rounded w-full object-cover image\"\n" +
                    "                    src=\"https://cdn.dribbble.com/users/508142/screenshots/15397516/media/3b2ca2e15104af8d2c6f65362c9f8a76.jpg?resize=1000x750&vertical=center\"\n" +
                    "                    alt=\"\">\n" +
                    "            </div>\n" +
                    "            <div class=\"px-10\">\n" +
                    "                <div class=\"py-5\">\n" +
                    "                    Chào [Tên Khách Hàng],\n" +
                    "                </div>\n" +
                    "                <p class=\"pb-5\">\n" +
                    "                    Chúng tôi xin gửi lời cảm ơn sâu sắc nhất từ Jordan VTH đến bạn vì đã chọn chúng tôi là địa điểm mua\n" +
                    "                    sắm giày của bạn. Chúng tôi đánh giá cao sự ủng hộ của bạn và hy vọng rằng bạn sẽ thích những sản\n" +
                    "                    phẩm mà bạn đã chọn.\n" +
                    "                </p>\n" +
                    "                <p class=\"pb-10\">\n" +
                    "                    Đơn hàng của bạn đã được xác nhận và đang được xử lý. Dưới đây là một số thông tin chi tiết về đơn\n" +
                    "                    hàng của bạn:\n" +
                    "                </p>\n" +
                    "                <div class=\"flex justify-center-items\">\n" +
                    "                    <a href=\"#\"\n" +
                    "                        class=\"hover-bg-green bg-green text-white px-40 py-5px text-xl inline-flex justify-center items-center rounded button\">\n" +
                    "                        Kiểm tra\n" +
                    "                    </a>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"phone-info text-gray pt-10 mx-auto flex justify-between items-center\">\n" +
                    "                <div>(+84) 379209871</div>\n" +
                    "                <div>jordanvth@gmail.com</div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"flex footer-links py-10\">\n" +
                    "                <div class=\"flex justify-start\">\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Visit us</div>\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Privacy Policy</div>\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Team of Use</div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>";
            MimeBodyPart htmlBodyPart = new MimeBodyPart();
            htmlBodyPart.setContent(htmlBody, "text/html; charset=UTF-8");

            MimeMultipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlBodyPart);

            message.setContent(multipart);
            Transport.send(message);
            System.out.println("Thành công !");
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void SenMail(String toMail, String maHoaDon,String thoiGianNhanHang, String phiShip, String tongTien, String tenNguoiNhan) {
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

            String htmlBody = "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\">\n" +
                    "    <title>SHOP JORDAN VTH</title>\n" +
                    "    <style>\n" +
                    "        @import url(\"https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\");\n" +
                    "\n" +
                    "        /* Base Styles */\n" +
                    "        html {\n" +
                    "            font-family: \"Be Vietnam Pro\", sans-serif;\n" +
                    "            color: #000;\n" +
                    "        }\n" +
                    "\n" +
                    "        body {\n" +
                    "            margin: 0;\n" +
                    "            padding: 0;\n" +
                    "            box-sizing: border-box;\n" +
                    "        }\n" +
                    "\n" +
                    "        img {\n" +
                    "            max-width: 100%;\n" +
                    "            display: block;\n" +
                    "        }\n" +
                    "\n" +
                    "        li {\n" +
                    "            list-style: none;\n" +
                    "            text-decoration: none;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* Utility Classes */\n" +
                    "        .bg-blue {\n" +
                    "            background-color: #00AEDF;\n" +
                    "        }\n" +
                    "\n" +
                    "        .w-600 {\n" +
                    "            width: 600px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .rounded {\n" +
                    "            border-radius: 0.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .mx-auto {\n" +
                    "            margin-left: auto;\n" +
                    "            margin-right: auto;\n" +
                    "        }\n" +
                    "\n" +
                    "        .bg-white {\n" +
                    "            background-color: #fff;\n" +
                    "        }\n" +
                    "\n" +
                    "        .container {\n" +
                    "            padding-left: 1rem;\n" +
                    "            padding-right: 1rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .flex {\n" +
                    "            display: flex;\n" +
                    "        }\n" +
                    "\n" +
                    "        .items-center {\n" +
                    "            align-items: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .justify-center {\n" +
                    "            justify-content: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .font-bold {\n" +
                    "            font-weight: 700;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-2xl {\n" +
                    "            font-size: 1.5rem;\n" +
                    "            line-height: 2rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-25px {\n" +
                    "            font-size: 1.5625rem;\n" +
                    "            line-height: 2rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .image {\n" +
                    "            height: 100%;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-center {\n" +
                    "            text-align: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .py-5 {\n" +
                    "            padding-top: 1.25rem;\n" +
                    "            padding-bottom: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .p-5 {\n" +
                    "            padding: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .max-h-80 {\n" +
                    "            max-height: 5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .object-cover {\n" +
                    "            object-fit: cover;\n" +
                    "        }\n" +
                    "\n" +
                    "        .px-10 {\n" +
                    "            padding-left: 2.5rem;\n" +
                    "            padding-right: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .pb-5 {\n" +
                    "            padding-bottom: 1.25rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .pb-10 {\n" +
                    "            padding-bottom: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .hover-bg-green:hover,\n" +
                    "        .bg-green {\n" +
                    "            background-color: #61BD4F;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-white {\n" +
                    "            color: #fff;\n" +
                    "        }\n" +
                    "\n" +
                    "        .px-40 {\n" +
                    "            padding-left: 2.5rem;\n" +
                    "            padding-right: 2.5rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .py-5px {\n" +
                    "            padding-top: 0.3125rem;\n" +
                    "            padding-bottom: 0.3125rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-xl {\n" +
                    "            font-size: 1.25rem;\n" +
                    "            line-height: 1.75rem;\n" +
                    "        }\n" +
                    "\n" +
                    "        .inline-flex {\n" +
                    "            display: inline-flex;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* Remaining Tailwind CSS Classes with Appropriate Names */\n" +
                    "        .justify-center-items {\n" +
                    "            justify-content: center;\n" +
                    "        }\n" +
                    "\n" +
                    "        .text-gray {\n" +
                    "            color: #afb3be;\n" +
                    "        }\n" +
                    "\n" +
                    "        .phone-info {\n" +
                    "            width: 350px;\n" +
                    "        }\n" +
                    "\n" +
                    "        .contact-info {\n" +
                    "            color: #afb3be;\n" +
                    "            padding-top: 2.5rem;\n" +
                    "            display: flex;\n" +
                    "            justify-content: space-between;\n" +
                    "        }\n" +
                    "\n" +
                    "        .footer-links {\n" +
                    "            padding-top: 2.5rem;\n" +
                    "            padding-bottom: 2.5rem;\n" +
                    "            display: flex;\n" +
                    "            justify-content: flex-start;\n" +
                    "        }\n" +
                    "\n" +
                    "        .footer-link {\n" +
                    "            font-size: 0.875rem;\n" +
                    "            line-height: 1.25rem;\n" +
                    "            padding-left: 3.125rem;\n" +
                    "            padding-right: 3.125rem;\n" +
                    "            border-right-width: 2px;\n" +
                    "            cursor: pointer;\n" +
                    "        }\n" +
                    "\n" +
                    "        .button:hover {\n" +
                    "            background: #49a736;\n" +
                    "        }\n" +
                    "\n" +
                    "        .container-img {\n" +
                    "            height: 360px !important;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body class=\"bg-blue\">\n" +
                    "    <div id=\"root\" class=\"w-600 rounded mx-auto bg-white m-5\">\n" +
                    "        <div class=\"container\">\n" +
                    "            <div class=\"flex items-center justify-center\">\n" +
                    "                <img class=\"w-20\" src=\"https://i.ibb.co/y8KrZXX/logo.png\" alt=\"\">\n" +
                    "                <div class=\"font-bold text-2xl\"></div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"text-25px text-center font-bold py-5\">Cảm ơn bạn đã mua sắm tại Jordan VTH!</div>\n" +
                    "            <div \n" +
                    "                <img \n" +
                    "                    src=\"\"\n" +
                    "                    alt=\"\">\n" +
                    "            </div>\n" +
                    "            <div class=\"px-10\">\n" +
                    "                <div class=\"py-5\">\n" +
                    "                    Chào " + tenNguoiNhan + ",\n" +
                    "                </div>\n" +
                    "                <p class=\"pb-5\">\n" +
                    "                    Chúng tôi xin gửi lời cảm ơn sâu sắc nhất từ Jordan VTH đến bạn vì đã chọn chúng tôi là địa điểm mua\n" +
                    "                    sắm giày của bạn. Chúng tôi đánh giá cao sự ủng hộ của bạn và hy vọng rằng bạn sẽ thích những sản\n" +
                    "                    phẩm mà bạn đã chọn.\n" +
                    "                </p>\n" +
                    "                <p class=\"pb-10\">\n" +
                    "                    Đơn hàng của bạn đã được xác nhận và đang được xử lý. Dưới đây là một số thông tin chi tiết về đơn\n" +
                    "                    hàng của bạn:\n" +
                    "                </p>\n" +
                    "                <div class=\"flex justify-center-items\">\n" +
                    "                    <a href=\"http://localhost:5173/tracuu\"\n" +
                    "                        class=\"hover-bg-green bg-green text-white px-40 py-5px text-xl inline-flex justify-center items-center rounded button\">\n" +
                    "                        Kiểm tra : "+  maHoaDon +" \n" +
                    "                    </a>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"phone-info text-gray pt-10 mx-auto flex justify-between items-center\">\n" +
                    "                <div>(+84) 379209871</div>\n" +
                    "                <div>jordanvth@gmail.com</div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div class=\"flex footer-links py-10\">\n" +
                    "                <div class=\"flex justify-start\">\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Visit us</div>\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Privacy Policy</div>\n" +
                    "                    <div class=\"text-sm text-gray footer-link\">Team of Use</div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>";
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