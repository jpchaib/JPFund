import React, { useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface GraphProps {
    info: any;
}

const Graph: React.FC<GraphProps> = ({ info }) => {
    let series: ApexAxisChartSeries | ApexNonAxisChartSeries | any = [
        {
            data: [],
        },
    ];

    Object.keys(info).forEach((key) => {
        let x = key;
        let y = [info[key]["1. open"], info[key]["2. high"], info[key]["3. low"], info[key]["4. close"]];

        series[0].data.push({
            x: x,
            y: y,
        });
    });

    console.log(series);

    const options: ApexOptions = {
        chart: {
            type: "candlestick",
            height: 350,
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            {
                <div id="chart">
                    <ReactApexChart options={options} series={series} type="candlestick" height={350} />
                </div>
            }
            <div></div>
        </div>
    );
};

export default Graph;
