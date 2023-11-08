import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const MyDonut= ({ data, value }) => {

    const options = {

        layout: {
            padding : 0,
          },
        responsive: false,
        maintainAspectRatio: false,
        plugins: {

            
            legend: {
                display: false,
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





  return<div className="tw-w-full tw-flex tw-h-full centerBox"> <Doughnut data={data} options={options}   width={150}
  height={150} /></div>
};

export default MyDonut;
