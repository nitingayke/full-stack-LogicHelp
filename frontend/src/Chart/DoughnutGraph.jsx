import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

export function DoughnutGraph({data}) {
  return <Doughnut options={options} data={data} />;
}
