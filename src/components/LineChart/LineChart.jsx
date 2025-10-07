import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

/**
 * LineChart component
 * Displays historical price data in a line chart using Google Charts.
 * 
 * @param {Object} props
 * @param {Object} props.historicalData - Historical price data in the format:
 *        { prices: [[timestamp, price], ...] }
 */
const LineChart = ({ historicalData }) => {
    // State to hold data formatted for Google Charts
    // Initial data includes column headers: ["Date", "Prices"]
    const [data, setData] = useState([["Date", "Prices"]]);

    /**
     * useEffect to process historicalData whenever it changes.
     * Converts timestamp to a readable date format and structures data for the chart.
     */
    useEffect(() => {
        // Initialize with column headers
        let dataCopy = [["Date", "Prices"]];

        // Check if historicalData contains price information
        if (historicalData.prices) {
            historicalData.prices.map((item) => {
                // Convert timestamp to local date string and remove year
                const formattedDate = new Date(item[0])
                    .toLocaleDateString()
                    .slice(0, -5);

                // Push formatted date and price to chart data
                dataCopy.push([formattedDate, item[1]]);
            });

            // Update state with prepared chart data
            setData(dataCopy);
        }
    }, [historicalData]); // Re-run effect whenever historicalData changes

    return (
        <Chart
            chartType='LineChart' // Chart type
            data={data}           // Data to display
            height="100%"         // Chart height
            legendToggle          // Allow toggling legend
        />
    );
};

export default LineChart;
