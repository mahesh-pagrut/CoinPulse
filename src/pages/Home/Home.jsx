import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext'; // Import context to access all coins and currency
import { Link } from 'react-router-dom';

/**
 * Home component
 * Displays the homepage with a hero section, search bar, and a table of top cryptocurrencies.
 */
export const Home = () => {

    // Access all coins and selected currency from context
    const { allCoin, currency } = useContext(CoinContext);

    // State to manage coins displayed in the table
    const [displayCoin, setDisplayCoin] = useState([]);

    // State to track the search input value
    const [input, setInput] = useState("");

    // State to track the filtered suggestions for the custom panel
    const [suggestions, setSuggestions] = useState([]);

    /**
     * Handles input change in search bar
     * Updates input state, resets displayCoin if input is cleared, 
     * and generates suggestions.
     */
    const inputHandler = (event) => {
        const value = event.target.value;
        setInput(value);

        if (value === "") {
            setDisplayCoin(allCoin); // Reset table if input is empty
            setSuggestions([]); // Clear suggestions
        } else {
            // Generate suggestions from allCoin based on current input
            const filteredSuggestions = allCoin
                .filter((item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.symbol.toLowerCase().includes(value.toLowerCase())
                )
                // Removed .slice(0, 5) to show all suggestions
                .slice(0, 10); // Limiting to top 10 to prevent excessively long lists
            setSuggestions(filteredSuggestions);
        }
    };

    /**
     * Handles search form submission
     * Filters coins based on search input and updates displayCoin state
     */
    const searchHandler = async (event) => {
        event.preventDefault();

        // Use the coins array logic from the previous input handler for filtering
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );

        setDisplayCoin(coins);
        setSuggestions([]); // Hide suggestions after search
        // Keep input value for search results context
    };

    /**
     * Handles clicking a suggestion item
     * Sets the input field to the selected coin name, hides suggestions, and performs the search
     */
    const selectSuggestion = (coinName) => {
        setInput(coinName);
        setSuggestions([]); // Hide suggestions

        // Immediately filter the main table with the selected coin
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase() === coinName.toLowerCase()
        );
        setDisplayCoin(coins);
    };

    /**
     * useEffect to initialize the displayed coins whenever allCoin changes
     */
    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    return (
        <div className='home'>

            {/* Hero section */}
            <div className='hero'>
                <h1>Largest <br />Crypto Marketplace</h1>
                <p>
                    Welcome to the world's largest cryptocurrency marketplace.
                    Sign up to explore more about cryptos.
                </p>

                {/* Search form */}
                <form onSubmit={searchHandler}>
                    {/* Container for Search Input and Custom Suggestions Panel */}
                    <div className='search-input-container'>
                        <input
                            onChange={inputHandler}
                            value={input}
                            type="text"
                            placeholder='Search crypto...'
                            autoComplete='off' // Disable native browser autocomplete
                        />

                        {/* Custom Suggestions Panel (Conditional Rendering) */}
                        {suggestions.length > 0 && (
                            <ul className='suggestions-panel'>
                                {suggestions.map((item, index) => (
                                    <li 
                                        key={index} 
                                        onClick={() => selectSuggestion(item.name)}
                                    >
                                        <img src={item.image} alt={item.symbol} />
                                        <p>{item.name} - {item.symbol.toUpperCase()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button type='submit'>Search</button>
                </form>
            </div>

            {/* Crypto table section */}
            <div className='crypto-table'>

                {/* Table header */}
                <div className='table-layout'>
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p style={{ textAlign: "center", marginLeft: "60px" }} className='market-cap'>Market Cap</p>
                </div>

                {/* Display top 15 coins */}
                {displayCoin.slice(0, 15).map((item, index) => (
                    <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt='coin-image' />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                            {Math.floor(item.price_change_percentage_24h * 100) / 100}
                        </p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};