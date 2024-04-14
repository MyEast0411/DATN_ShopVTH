import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function About() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="container">
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">Giới thiệu</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Chào mừng bạn đến với VTH - Nơi trải nghiệm giày Jordan chất lượng
              nhất!
            </h1>
            <p className="text-lg mb-5">
              Với niềm đam mê và sự chuyên nghiệp, chúng tôi tự hào mang đến cho
              bạn những đôi giày Jordan hàng đầu thế giới. VTH cam kết chỉ cung
              cấp những sản phẩm chính hãng, đảm bảo về chất lượng và tính hợp
              pháp.
            </p>
            <p className="text-lg mb-5">
              Tại VTH, không chỉ là nơi mua sắm, mà còn là nơi bạn có thể tìm
              thấy những câu chuyện thú vị về thế giới giày sneaker và cộng đồng
              yêu giày Jordan. Chúng tôi hy vọng rằng bạn sẽ tận hưởng trải
              nghiệm mua sắm tuyệt vời tại trang web của chúng tôi!
            </p>
            <p className="text-lg mb-5">
              Hãy khám phá cửa hàng của chúng tôi và tìm kiếm cho mình những đôi
              giày Jordan ưa thích ngay hôm nay!
            </p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dmubfrefi/image/private/s--mhBuNNFo--/c_crop,h_1800,w_3200,x_0,y_0/c_scale,w_1200/f_auto/q_auto/v1/dee-about-cms-prod-medias/313a7cb0-81f4-4292-9b3e-c6286ddd1cea/creating-the-unreal-how-nike-made-its-wildest-air-footwear-yet.jpg?_a=BAAAROBs"
              alt="Sneaker"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
