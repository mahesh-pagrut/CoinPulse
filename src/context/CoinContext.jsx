import { createContext, useEffect, useState } from "react";

// Create a context for managing coin-related data
// This will be used by components to consume coin data and currency state
export const CoinContext = createContext();

/**
 * CoinContextProvider component
 * Provides coin data and currency selection state to all child components
 */
const CoinContextProvider = ({ children }) => {

    // State to store all coins fetched from CoinGecko API
    const [allCoin, setAllCoin] = useState([]);

    // State to store the selected currency and its symbol
    const [currency, setCurrency] = useState({
        name: "usd",  // default currency
        symbol: "$"   // default currency symbol
    });

    /**
     * useEffect hook to fetch coin data whenever the selected currency changes.
     * The fetch function is defined inside useEffect to avoid ESLint dependency warnings.
     */
    useEffect(() => {

        // Async function to fetch all coin data from CoinGecko API
        const fetchAllCoin = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-AZCxCEDF4JoSCFw9pKVtMX8G' // demo API key
                }
            };

            try {
                // Fetch coin market data based on selected currency
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                    options
                );

                // Parse JSON response
                const data = await response.json();

                // Update state with fetched coin data
                setAllCoin(data);
            } catch (error) {
                // Log any errors during fetch
                console.error("Error fetching coin data:", error);
            }
        };

        // Call the fetch function
        fetchAllCoin();

    }, [currency]); // Re-run effect whenever currency changes

    // Context value to provide coin data, currency state, and setter function
    const contextValue = {
        allCoin,
        currency,
        setCurrency
    };

    // Provide the context to all child components
    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
