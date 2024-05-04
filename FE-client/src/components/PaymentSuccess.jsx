import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToHoaDon } from "../apis/HoaDon";
function PayMentSuccess() {
    const urlObject = new URL(window.location.href);
    const vnp_ResponseCode = urlObject.searchParams.get("vnp_ResponseCode");
    const cartNotLoginDTO = JSON.parse(sessionStorage.getItem("formBill"));

    const navigate = useNavigate();
    useEffect(() => {
        if (vnp_ResponseCode === '00') {
            localStorage.removeItem("maList");
            navigate("/thanh-toan-thanh-cong");
            onPayment(cartNotLoginDTO);
        }
    }, []);
    const onPayment = async (cartNotLoginDTO) => {
        try {
            const result = await addToHoaDon(cartNotLoginDTO);
            console.log("result:", result);
            // localStorage.removeItem("maList");
            // navigate("/thanh-toan-thanh-cong");
            return;
        } catch (error) {
            console.error("Error adding to HoaDon:", error);
        }
    }
    return (
    <>
            {/* {vnp_ResponseCode === '00' ? (
                
            ) : (
                <div className="content-payment-success">
                    <h1>Thanh toán thất bại</h1>
                    <div>
                        <Link to="/payment">Thử lại</Link>
                        <Link style={{ marginLeft: "10px" }} to="/home">Tiếp tục mua</Link>
                    </div>
                </div>
            )} */}
    </>
    );
}

export default PayMentSuccess;