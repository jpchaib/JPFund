import React, { useContext, useEffect, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { SMAContext } from "../../contexts/SMAContext";
import { organizeCandleData, organizeLineData } from "../../services/papers";
import { mockseries } from "../../services/mockData";
import { SMA2Context } from "../../contexts/SMA2Context";

interface GraphProps {
    info: any;
}

const Graph: React.FC<GraphProps> = ({ info }) => {
    const { SMA, setSMA } = useContext(SMAContext);
    const { SMA2, setSMA2 } = useContext(SMA2Context);
    const [note, setNote] = useState("");
    const [showError, setShowError] = useState(false);
    const [candleSeries, setCandleSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | any>([
        {
            data: [],
        },
    ]);
    const [lineSeries, setLineSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | any>([
        {
            data: [],
        },
    ]);

    useEffect(() => {
        console.log(info);
        if (SMA && SMA2) {
            setLineSeries([
                {
                    data: organizeLineData(SMA),
                },
                {
                    data: organizeLineData(SMA2),
                },
            ]);
        }
        setCandleSeries([
            {
                data: organizeCandleData(info),
            },
        ]);
    }, [info, SMA, SMA2]);

    const candleOptions: ApexOptions = {
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

    const lineOptions: ApexOptions = {
        chart: {
            type: "line",
            height: 350,
        },

        title: {
            text: "SMA Chart",
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
            <div id="chart">
                <ReactApexChart options={candleOptions} series={candleSeries} type="candlestick" height={350} />
                <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={350} />
            </div>
        </div>
    );
};

export default Graph;
