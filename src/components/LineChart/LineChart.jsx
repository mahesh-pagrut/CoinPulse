import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]]);

    useEffect(() => {
        if (!historicalData || !historicalData.prices) return;
        
        let dataCopy = [["Date", "Prices"]];
        historicalData.prices.forEach((item) => {
            dataCopy.push([new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]]);
        });

        setData(dataCopy);
    }, [historicalData]);

    if (data.length <= 1) return <p>Loading chart...</p>;

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={{ legend: { position: 'bottom' } }}
        />
    );
};

export default LineChart;
