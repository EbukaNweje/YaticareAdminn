import {  useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const SimpleBarChart = () => {
  const chartRef = useRef(null);

 
  const labels = [
    'Processed Deposits',
    'Pending Deposits',
    'Processed Withdrawal',
    'Pending Withdrawal',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * 10000)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.floor(Math.random() * 10000)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
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
        text: 'Transactions statistics in $',
      },
    },
  };

  return <Bar ref={chartRef} options={options} data={data} />;
};
