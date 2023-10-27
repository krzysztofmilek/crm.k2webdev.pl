import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const MyDonut= ({ data, value }) => {
    const options = {
        layout: {
            padding: 0,
          },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {

            
            legend: {
                display: true,
                position: "right",
                title: {
                  display: true,
                  text: "",
                },
              },
          tooltip: {
            enabled: true
          }
        },
        animation: {
            onComplete: function (animation) {
                const chart = animation.chart;
                const ctx = chart.ctx;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';
                ctx.font = 'bold 20px Calibri ';
                const text = `${value}%`;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                ctx.fillText(text, centerX, centerY);
                ctx.restore();
            },

     
            
        }
      };





  return <Doughnut data={data} options={options} />;
};

export default MyDonut;
