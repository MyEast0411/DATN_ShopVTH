import { request } from "../helper/request";
export class PaymentVNPAYAPI {
    static paymentVnpay = ( data) => {
      return request({
        method: "POST",
        url: `/hoa_don/thanhToanVoiVNPAY` ,
        data: data
      });
    };
}