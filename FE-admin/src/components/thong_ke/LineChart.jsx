import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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

export function LineChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Doanh thu",
        data: UserData.map((data) => data.userGain / 1000),
        backgroundColor: ["#2a71d0"],
        borderColor: "#2a71d0",
        borderJoinStyle: "miter",
        // borderWidth: 2,
        // borderRadius: 5,
      },
      {
        label: "Lợi nhuận",
        data: UserData.map((data) => data.userGain / 10000),
        borderColor: "#f3ba2f",
        backgroundColor: "#f3ba2f",
        borderJoinStyle: "miter",
      },
    ],
  });
  return (
    <div style={{ width: 660, marginLeft: 5 }}>
      {/* <div style={{ width: 600, height: 271, marginLeft: 60 }}> */}
      <Line data={userData} />
    </div>
  );
}
