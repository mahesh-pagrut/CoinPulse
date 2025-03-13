import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import { GiCrystalGrowth } from "react-icons/gi";
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext);

    const currencyHandler = (event) => {
        const selectedCurrency = event.target.value;
        const currencyMap = {
            usd: { name: "usd", symbol: "$" },
            eur: { name: "eur", symbol: "€" },
            inr: { name: "inr", symbol: "₹" }
        };
        setCurrency(currencyMap[selectedCurrency] || currencyMap["usd"]);
    };

    return (
        <div className='navbar'>
            {/* Logo Name with Icon */}
            <Link to={'/'} className="brand">
            <img src={logo} alt="CoinPulse Logo" className="logo" />
                <span>CoinPulse</span>
            </Link>

            {/* Navbar Links */}
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blogs</li>
            </ul>

            {/* Currency & Signup */}
            <div className="nav-right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EURO</option>
                    <option value="inr">INR</option>
                </select>
                <button>Sign Up</button>
            </div>
        </div>
    );
};

export default Navbar;
