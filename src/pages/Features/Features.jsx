import React from 'react';
import './Features.css';
import { Link } from 'react-router-dom';

/**
 * Features component
 * Placeholder page detailing the main features of the CoinPulse platform.
 */
const Features = () => {

    // Array of features to display
    const featureList = [
        "Real-Time Price Tracking: Get up-to-the-second data for thousands of coins.",
        "Customizable Watchlist: Track your favorite cryptos easily.",
        "Detailed Coin Analytics: Access market cap, volume, and historical data.",
        "Multi-Currency Support: View prices in USD, EUR, INR, and more.",
        "Secure Data Infrastructure: Reliable and fast data fetching.",
    ];

    return (
        <div className='home'> {/* Reusing home class for consistent padding and background */}
            <div className='hero'> {/* Reusing hero class for centered layout */}
                <h1>Powerful Features for Crypto Enthusiasts</h1>
                <p>
                    CoinPulse is built with the tools you need to stay ahead in the dynamic crypto market.
                    Explore our core offerings below.
                </p>
                
                <div className="features-list">
                    {featureList.map((feature, index) => (
                        <div key={index} className="feature-item">
                            ✅ {feature}
                        </div>
                    ))}
                </div>

                <Link to="/">
                    <button>Start Tracking Now</button>
                </Link>
            </div>
        </div>
    );
};

export default Features;