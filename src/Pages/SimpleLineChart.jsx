import {  useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const SimpleLineChart = () => {
  const chartRef = useRef(null);

 
  const labels = [
    'Jan',
    "Feb",
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const userData = localStorage.getItem("allUserData")
        ? JSON.parse(localStorage.getItem("allUserData"))
        : [];
    console.log(userData);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random(userData?.data?.length) * userData?.data?.length)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => Math.floor(Math.random() * userData?.data?.length)),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  const options = {
    responsive: true, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active Users',
      },
    },
  };

  return <Line ref={chartRef} options={options} data={data} />;
};
