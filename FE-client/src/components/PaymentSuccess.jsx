import { useEffect } from "react";
import { Link } from "react-router-dom";
function PayMentSuccess() {

    const urlObject = new URL(window.location.href);
    const vnp_ResponseCode = urlObject.searchParams.get("vnp_ResponseCode");
    const vnp_Amount = urlObject.searchParams.get("vnp_Amount");
    const formBill = JSON.parse(sessionStorage.getItem("formBill"))
    useEffect(() => {
        if (vnp_ResponseCode === '00') {
            console.log(formBill);
            onPayment(formBill)
        }
    }, [])
    const formatMoney = (price) => {
        return (
            parseInt(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
        );
    };
    const onPayment = (formBill) => {
        console.log("thanh cong");
    }
    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            {vnp_ResponseCode === '00' ? (
                <div className="content-payment-success">
                    <h1>Thanh toán thành công</h1>
                    <div style={{ marginTop: "5%" }}>Tổng thanh toán:  {formatMoney(vnp_Amount / 100)}</div>
                    <Link to="/home">Tiếp tục mua</Link>
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