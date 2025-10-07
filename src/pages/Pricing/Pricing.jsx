import React from 'react';
import './Pricing.css';
import { Link } from 'react-router-dom';

/**
 * Pricing component
 * Placeholder page displaying different subscription plans.
 */
const Pricing = () => {

    // Define the pricing plans
    const plans = [
        {
            name: "Basic",
            price: "Free",
            features: [
                "Top 100 Coin Data", 
                "Standard Watchlist", 
                "USD/EUR/INR Currency"
            ],
            isPopular: false
        },
        {
            name: "Pro",
            price: "$9.99/mo",
            features: [
                "Top 500 Coin Data", 
                "Advanced Analytics", 
                "Priority Support",
                "Ad-Free Experience"
            ],
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "Contact Us",
            features: [
                "Full Market Access", 
                "API Integrations", 
                "Dedicated Account Manager", 
                "Custom Reporting"
            ],
            isPopular: false
        }
    ];

    return (
        <div className='home'> {/* Consistent page container */}
            <div className='hero'>
                <h1>Simple, Transparent Pricing</h1>
                <p>
                    Choose the plan that best fits your needs, whether you're a casual tracker
                    or a serious market analyst.
                </p>
            </div>

            <div className='pricing-container'>
                {plans.map((plan, index) => (
                    <div 
                        key={index} 
                        className={`price-card ${plan.isPopular ? 'popular' : ''}`}
                    >
                        {plan.isPopular && <div className='popular-badge'>Most Popular</div>}
                        <h2>{plan.name}</h2>
                        <p className='price'>{plan.price}</p>
                        <ul className='features-list'>
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>⭐ {feature}</li>
                            ))}
                        </ul>
                        <button className={plan.isPopular ? 'popular-btn' : ''}>
                            {plan.name === 'Enterprise' ? 'Get Quote' : 'Choose Plan'}
                        </button>
                    </div>
                ))}
            </div>

            <div className='cta-link'>
                <p>Ready to get started? <Link to="/features">See all features.</Link></p>
            </div>
        </div>
    );
};

export default Pricing;