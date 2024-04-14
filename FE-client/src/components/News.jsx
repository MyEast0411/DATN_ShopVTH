import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function News() {
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
            <Link className="text-[#B4B4B3] cursor-default">Tin tức</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="container py-10">
        <div className="posts">
          <div className="post">
            <div className="post__image post__image--1"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  NHỮNG MẪU GIÀY THAY THẾ NIKE BLAZER TRONG TẦM GIÁ
                </h3>
                <p className="post__excerpt">
                  Hiện nay, những đôi ngày Nike Blazer là biểu tượng của giới
                  sneaker và khiến nó trở nên...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="post">
            <div className="post__image post__image--2"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  KHÁM PHÁ NHỮNG MẪU SNEAKER NAM ẤN TƯỢNG NĂM 2024
                </h3>
                <p className="post__excerpt">
                  Trong thế giới sneaker hiện nay những đôi giày thược dòng
                  High-top...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="post">
            <div className="post__image post__image--3"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  NHỮNG ĐIỀU CẦN QUAN TÂM VỀ KYRIE 8 INFINITY TRƯỚC KHI MUAr
                </h3>
                <p className="post__excerpt">
                  Nhà Nike đã từng hợp tác với rất nhiều những siêu sao bóng rổ
                  để sản...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="post">
            <div className="post__image post__image--4"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  NHỮNG LÝ DO NIKE KYRIE 7 ĐƯỢC YÊU THÍCH CỦA NHIỀU NGƯỜI
                </h3>
                <p className="post__excerpt">
                  Nhà Nike có một đôi giày đình đám dành cho người hâm mộ và
                  giới cầu thù bóng rổ...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="post">
            <div className="post__image post__image--5"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  TÌM HIỂU SỰ HOÀN HẢO CỦA NIKE KD 16 MANG ĐẬM HIỆU NĂNG VÀ
                  PHONG CÁCH
                </h3>
                <p className="post__excerpt">
                  Nhà Nike sở hữu nhiều đôi giày chất lượng trong bộ sưu tập của
                  mình và Nike KD...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="post">
            <div className="post__image post__image--6"></div>
            <div className="post__content">
              <div className="post__inside">
                <h3 className="post__title">
                  TÌM HIỂU SỨC HÚT ĐẶC BIỆT CỦA NIKE BLAZER
                </h3>
                <p className="post__excerpt">
                  Nike Blazer là đâu giày đến từ nhà Nike mang phong cách đặc
                  biệt nhất...
                </p>
                <button className="btn--accent post__button">
                  Đọc thêm
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
