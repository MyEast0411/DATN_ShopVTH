import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InfoTop from "../layout/InfoTop";
import ShopRecommend from "../layout/ShopRecommend";

export default function SuccessOrder() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="max-w-[1000px] mx-auto flex justify-center flex-col items-center shadow-lg my-5 p-10 py-[100px]">
        <div className="check-container max-w-[500px]">
          <div className="check-background">
            <svg
              viewBox="0 0 65 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 25L27.3077 44L58.5 7"
                stroke="white"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="check-shadow"></div>
        </div>
        <div className="max-w-[500px] text-center mx-auto">
          <div className="font-bold text-lg">
            Đơn hàng của bạn đã được xác nhận!
          </div>
          <div className="my-2 mx-auto text-center text-sm">
            Chúng tôi sẽ gửi cho bạn email xác nhận vận chuyển ngay khi đơn đặt
            hàng của bạn được giao.
          </div>
          <div className="py-4 flex items-center justify-evenly">
            <button className="btn-view-order">
              <a href="/tracuu">Xem đơn hàng</a>
            </button>

            <a href="/shop" className="continue-shopping-btn">
              Tiếp tục mua sắm
              <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                <path
                  clipRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ShopRecommend />
      <Footer />
    </>
  );
}
