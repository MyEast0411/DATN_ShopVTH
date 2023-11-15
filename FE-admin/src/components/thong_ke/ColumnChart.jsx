import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// export
const UserData = [
  {
    id: 1,
    year: " 2",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "3",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: " 4",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "5",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 5,
    year: " 6",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 6,
    year: " 7",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 7,
    year: "8",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 1,
    year: "9",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "10",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: "11",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "12",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 5,
    year: "13",
    userGain: 4300000,
    userLost: 234,
  },
];

// export const options = {
//   chart: {
//     title: "Company Performance",
//     subtitle: "Sales, Expenses, and Profit: 2014-2017",
//   },
// };

export function ColumnChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Số  Tiền (Đơn vị  tính  :  1.000 ₫)",
        data: UserData.map((data) => data.userGain / 1000),
        backgroundColor: [
          // "rgba(75,192,192,1)",
          // "#ecf0f1",
          // "#50AF95",
          // "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  });
  return (
    <div style={{ width: 600, height: 271, marginLeft: 60 }}>
      <Bar data={userData} />
    </div>
  );
}
