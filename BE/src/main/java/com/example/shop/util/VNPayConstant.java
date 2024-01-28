package com.example.shop.util;

public abstract class VNPayConstant {
    public static String vnp_Version = "2.1.0";
    public static String vnp_Command = "2.1.0";
    public static String vnp_TmnCode = "11CG57AD";
    public static String vnp_HashSecret = "OOVYIJVYUBGEZMREEZTJRFKHSLGVTJSE";
    public static String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String vnp_BankCode = "";
    public static String vnp_CurrCode = "VND";
    public static String vnp_Locale = "vn";
    public static String vnp_ReturnUrl = "http://localhost:5173/payment/payment-success";

    public static String vnp_ReturnUrlBuyOnline = "http://localhost:5173/client/payment/payment-success";
}
