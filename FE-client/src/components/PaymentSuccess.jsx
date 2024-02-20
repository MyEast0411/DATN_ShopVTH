import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToHoaDon } from "../apis/HoaDon";
import logo from "./../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck,faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./style-payment.css"
function PayMentSuccess() {

    const urlObject = new URL(window.location.href);
    const vnp_ResponseCode = urlObject.searchParams.get("vnp_ResponseCode");
    const vnp_Amount = urlObject.searchParams.get("vnp_Amount");
    const cartNotLoginDTO = JSON.parse(sessionStorage.getItem("formBill"))
    useEffect(() => {
        if (vnp_ResponseCode === '00') {
            onPayment(cartNotLoginDTO)
        }
    }, [])
    const formatMoney = (price) => {
        return (
            parseInt(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
        );
    };
    const onPayment = async (cartNotLoginDTO) => {
        try {
            const result = await addToHoaDon(cartNotLoginDTO);
            console.log("result:", result);
            localStorage.removeItem("maList");
        } catch (error) {
            console.error("Error adding to HoaDon:", error);
        }
    }
    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            {vnp_ResponseCode === '00' ? (
                <div className="content-payment-success">
                    <h1>Thanh toán thành công</h1>
                    <div style={{ marginTop: "5%" }}>Tổng thanh toán:  {formatMoney(vnp_Amount / 100)}</div>
                    <Link to="/">Tiếp tục mua</Link>
                </div>
            ) : (
                <div className="content-payment-success">
                    <h1>Thanh toán thất bại</h1>
                    <div>
                        <Link to="/payment">Thử lại</Link>
                        <Link style={{ marginLeft: "10px" }} to="/home">Tiếp tục mua</Link>
                    </div>
                </div>
            )}
        </div>
    </>);
}

export default PayMentSuccess;