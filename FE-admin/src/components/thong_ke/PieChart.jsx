import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// export
const UserData = [
  {
    id: 1,
    year: "Giao dịch",
    userGain: 30,
  },
  {
    id: 2,
    year: "khoản thanh toán",
    userGain: 40,
  },
  {
    id: 3,
    year: "Bán  Hàng",
    userGain: 30,
  },
  {
    id: 3,
    year: "Báo Cáo",
    userGain: 50,
  },
];

export function PieChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: ` (Đơn vị  tính  : %)`,
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0", "red"],
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  });
  return (
    <div style={{ width: 300, marginLeft: "25%" }}>
      <Doughnut data={userData} />
    </div>
  );
}
