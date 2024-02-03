import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InfoTop from "../layout/InfoTop";

export default function Test() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="max-w-[1000px] mx-auto flex justify-center flex-col items-center shadow-lg my-5">
        <div className="check-container">
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
        <div className="font-bold">Cảm ơn bạn đã mua hàng !</div>
      </div>
      <Footer />
    </>
  );
}
