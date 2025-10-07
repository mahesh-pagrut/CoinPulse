import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext'; // Import CoinContext to access selected currency
import LineChart from '../../components/LineChart/LineChart'; // LineChart component for historical prices

/**
 * Coin component
 * Displays detailed information about a selected cryptocurrency including:
 * - Current price and market data
 * - 24h high/low
 * - Market cap
 * - Historical price chart
 */
const Coin = () => {

    // Extract coinId from URL parameters
    const { coinId } = useParams();

    // State to store the fetched coin data
    const [coinData, setCoinData] = useState();

    // State to store historical price data for chart
    const [historicalData, setHistoricalData] = useState();

    // Access the currently selected currency from context
    const { currency } = useContext(CoinContext);

    /**
     * Fetch detailed coin data from CoinGecko API
     */
    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': 'CG-AZCxCEDF4JoSCFw9pKVtMX8G' 
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res)) // Update coinData state
            .catch(err => console.error(err)); // Log any errors
    };

    /**
     * Fetch historical market chart data for the coin
     * Based on the selected currency and last 10 days
     */
    const fetchHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': 'CG-AZCxCEDF4JoSCFw9pKVtMX8G' 
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setHistoricalData(res)) // Update historicalData state
            .catch(err => console.error(err));
    };

    /**
     * useEffect to fetch coin data and historical data
     * Runs whenever the selected currency changes
     */
    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [currency]); // Dependency: currency

    // Show spinner while data is loading
    if (!coinData || !historicalData) {
        return (
            <div className='spinner'>
                <div className='spin'></div>
            </div>
        );
    }

    // Render coin details once data is available
    return (
        <div className='coin'>

            {/* Coin name and image */}
            <div className="coin-name">
                <img src={coinData.image.large} alt="coin-image" />
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
            </div>

            {/* Historical price chart */}
            <div className='coin-chart'>
                <LineChart historicalData={historicalData} />
            </div>

            {/* Coin market info */}
            <div className='coin-info'>
                <ul>
                    <li>Crypto Market Rank</li>
                    <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>Market Cap</li>
                    <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>24 Hour High</li>
                    <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>24 Hour Low</li>
                    <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                </ul>
            </div>
        </div>
    );
};

export default Coin;
