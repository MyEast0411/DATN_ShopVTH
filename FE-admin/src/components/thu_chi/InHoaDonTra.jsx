import { Divider, Table } from "antd";
import logo from "../../assets/logo.png";
import React from "react";
import { format } from "date-fns";
import QRCode from "qrcode.react";

// xuất ảnh
const InHoaDonTra = React.forwardRef((props, ref) => {
  console.log(props);
  //   const [tong, setTong] = React.useState(0);
  //   const handleTong = () => {
  //     const sum = props.data.reduce(
  //       (accumulator, currentValue) =>
  //         accumulator + currentValue.price * currentValue.quantity,
  //       0
  //     );
  //     setTong(sum);
  //   };

  //   React.useEffect(handleTong, []);
  return (
    <div
      ref={ref}
      style={{
        // backgroundColor: "wheat",
        borderRadius: 10,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="bill p-5"
        style={{
          // backgroundColor: "wheat",
          borderRadius: 10,
          margin: " 5px auto",
        }}
      >
        <div className="flex justify-around">
          <div>
            <div className="content grid justify-items-center">
              <p
                className=" whitespace-pre font-semibold mb-6"
                style={{ fontSize: "30px" }}
              >
                Jordan VTH
              </p>
              <p>SDT : 099456999</p>
              <p>Gmail : vthstore1234@gmail.com</p>
              <p>
                Địa chỉ : Số 11 , Đường Nhuệ , Tân Hội , Tân Lập , Đan Phượng
              </p>
            </div>
          </div>
        </div>
        <div class="flex ...gap-20 m-4 justify-center">
          <p
            className=" whitespace-pre font-semibold text-center"
            style={{ fontSize: "30px" }}
          >
            Hóa Đơn Bán Hàng
          </p>
        </div>
        <div class="flex ... gap-10 " style={{ fontSize: 15 }}>
          <div class="w-2/4 ...">
            <p>
              Khách Hàng :&nbsp;&nbsp;
              <span className="italic font-medium">
                {props.inforKH.id_khach_hang?.ten}
              </span>
            </p>
            <p>
              Số Điện thoại :&nbsp;&nbsp;
              <span className="italic font-medium ">
                {props.inforKH.id_khach_hang?.sdt}
              </span>
            </p>
            <p>
              Địa chỉ khách hàng :&nbsp;&nbsp;
              <span className="italic font-medium">
                {props.inforKH?.diaChi}
              </span>
            </p>
          </div>
          <div class="w-2/4 ...">
            <p className="text-left">
              Hóa đơn :&nbsp;&nbsp;
              <span className="italic font-medium"> {props.inforKH.ma}</span>
            </p>
            <p className="text-left">
              Thời gian :&nbsp;&nbsp;
              <span className="italic font-medium">
                &nbsp;&nbsp;
                {format(
                  new Date(props.inforKH.ngayTao),
                  " hh:mm ,   dd-MM-yyyy"
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="sp  p-5">
        <div className="hoa-don-chi-tiet">
          <p>Sản Phẩm Mua</p>
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    STT
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Giá
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Số lượng
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.dataHD.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {product.id_chi_tiet_san_pham.ten} "
                      {product.id_chi_tiet_san_pham.id_mau_sac.ten}" [
                      {product.id_chi_tiet_san_pham.id_kich_co.ten}]
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {Intl.NumberFormat().format(product.giaTien)} ₫
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {product.soLuong}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {Intl.NumberFormat().format(
                        product.giaTien * product.soLuong
                      )}
                      &nbsp;&nbsp; ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="hoa-don-chi-tiet">
          <p>Sản Phẩm Trả</p>
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    STT
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Giá
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Số lượng
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {product.name}
                      <br />
                      {" ( "}
                      {product.mausac}
                      {" , "}
                      {product.kichco}
                      {" ) "}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {Intl.NumberFormat().format(product.price)} ₫
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {product.quantity}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {Intl.NumberFormat().format(
                        product.price * product.quantity
                      )}
                      &nbsp;&nbsp; ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="mt-4  space-y-5 flex  justify-between">
          <div style={{ textAlign: "center", margin: "20px" }}>
            <QRCode
              value={props.inforKH.ma}
              size={100}
              includeMargin={false}
              style={{
                borderRadius: 5,
                border: "1px solid #dccec",
              }}
            />
          </div>
          <div className="space-y-3">
            <p className="text-end " style={{ fontSize: 17 }}>
              Tổng cộng :&nbsp;&nbsp;
              <span className="italic">{Intl.NumberFormat().format(0)} ₫</span>
            </p>
            <p style={{ fontSize: 17 }}>
              <span className="me-5"> Thuế(%) :&nbsp;&nbsp;</span>

              <span className=" text-end italic">
                {Intl.NumberFormat().format(0)} ₫
              </span>
            </p>

            <p className="text-end" style={{ fontSize: 17 }}>
              <span className=" "> Tổng tiền : </span>&nbsp;&nbsp;
              <span className=" ">
                &nbsp;&nbsp;
                <span className="italic">
                  {Intl.NumberFormat().format(0)} ₫
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InHoaDonTra;
