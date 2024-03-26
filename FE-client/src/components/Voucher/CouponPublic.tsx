import React from "react";
import { Link } from "react-router-dom";
import "./Coupon.css";

interface CouponProps {
  id: string;
  percentOff: string;
  maxValue: string;
  minValue: string;
  expirationDate: string;
}

const CouponPublic: React.FC<CouponProps> = ({
  id,
  percentOff,
  maxValue,
  minValue,
  expirationDate,
}) => {
  return (
    <div className="coupon-container">
      <div className="coupon-container__brand">Jordan VTH</div>
      <div className="coupon-value flex flex-col justify-center items-center">
        <div className="coupon-value__percent text-xl font-bold py-2">
          {percentOff}
        </div>
        <small className="coupon-container__max font-normal">
          Tối đa: {maxValue} VNĐ
        </small>
        <small className="coupon-container__max font-light">
          Tối thiểu: {minValue} VNĐ
        </small>
        <div className="coupon__code">
          <Link to={`/${id}`} className="coupon__code-check">
            Xem
          </Link>
        </div>
        <small className="coupon-container__max font-light">
          Giá trị đến {expirationDate}
        </small>
      </div>
    </div>
  );
};

export default CouponPublic;
