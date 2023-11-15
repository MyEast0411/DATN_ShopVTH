import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// export
const UserDataWeek = [
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
    year: "CN",
    userGain: 4300000,
    userLost: 234,
  },
];

const UserDataMonth = [
  {
    id: 1,
    year: "1",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "2",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: "3",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "4",
    userGain: 90000000,
    userLost: 4555,
  },
];
const UserDataYear = [
  {
    id: 1,
    year: "1",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "2",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: "3",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "4",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 5,
    year: "5",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 6,
    year: "6",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 7,
    year: "7",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 8,
    year: "8",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 9,
    year: "9",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 10,
    year: "10",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 11,
    year: "11",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 12,
    year: "12",
    userGain: 4300000,
    userLost: 234,
  },
];
const colors = [
  "#ec3237",
  "#f05737",
  "#f58634",
  "#fbb030",
  "#FFF112",
  "#8CC76B",
  "#00A85A",
  "#5BC6D0",
  "#354C9C",
  "#6966AB",
  "#6E59A4",
  "#8959A3",
];
export function ColumnChart({ value }) {
  const [userData, setUserData] = useState({
    labels: UserDataWeek.map((data) => data.year),
    datasets: [
      {
        label: ` Đơn vị  tính (1.000 ₫) : `,
        data: UserDataWeek.map((data) => data.userGain),
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  });

  useEffect(() => {
    if (value == "week") {
      setUserData({
        labels: UserDataWeek.map((data) => data.year),
        datasets: [
          {
            label: ` Đơn vị  tính (1.000₫) : `,
            data: UserDataWeek.map((data) => data.userGain),
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 5,
          },
        ],
      });
    }

    if (value == "month") {
      setUserData({
        labels: UserDataMonth.map((data) => data.year),
        datasets: [
          {
            label: ` Đơn vị  tính (1.000 ₫) : `,
            data: UserDataMonth.map((data) => data.userGain),
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 5,
          },
        ],
      });
    }

    if (value == "year") {
      setUserData({
        labels: UserDataYear.map((data) => data.year),
        datasets: [
          {
            label: ` Đơn vị  tính (1.000₫) : `,
            data: UserDataYear.map((data) => data.userGain),
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 5,
          },
        ],
      });
    }
  }, [value]);

  return (
    <div style={{ width: 600, height: 271, marginLeft: 60 }}>
      <Bar data={userData} />
    </div>
  );
}
