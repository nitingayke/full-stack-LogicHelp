import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            reverse: true, // Reverse the Y-axis
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function LineGraph({ data }){
    return <Line options={options} data={data} />;
}