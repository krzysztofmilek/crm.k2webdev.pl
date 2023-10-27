/* // FunnelChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

const FunnelChart = () => {
  const data = {
    labels: ["Kontakty", "Oferty", "Sprzedaż"],
    datasets: [
      {
        data: [5, 3, 1],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",

    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: {
          display: false, // ukrywa opisy ticków na osi X
        },
        grid: {
          display: false, // ukrywa linie siatki dla osi X
          drawBorder: false, // ukrywa linię osi
          drawOnChartArea: false,
        },
      },
      y: {
        barThickness: 100,
        ticks: {
               display: false, // ukrywa opisy ticków na osi X 
        },
        grid: {
          display: false, // ukrywa linie siatki dla osi Y
          drawBorder: false, // ukrywa linię osi
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "right",
        title: {
          display: false,
          text: "",
        },
      },
    },
  };

  return (
    <div style={{ height: "100px", width: "100px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FunnelChart;
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';

const FunnelChart = () => {
    const dataValues = [5, 3, 1];
    const mirroredValues = [-5, -3, -1]; // Lustrzane odbicie wartości
    const labels = ['Kontakty', 'Oferty', 'Sprzedaż'];

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
            {
                data: mirroredValues,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
              beginAtZero: true,
              max: 5,
              min: -2,
              stacked: true,
              ticks: {
                display: false, // ukrywa opisy ticków na osi X
              },
              grid: {
                display: false, // ukrywa linie siatki dla osi X
                drawBorder: false, // ukrywa linię osi
                drawOnChartArea: false,
              },
            },
            y: {
              barThickness: 100,
              ticks: {
                     display: false, // ukrywa opisy ticków na osi X 
              },
              grid: {
                display: false, // ukrywa linie siatki dla osi Y
                drawBorder: false, // ukrywa linię osi
                drawOnChartArea: false,
              },
            },
          },



























        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div style={{ height: '300px' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default FunnelChart;