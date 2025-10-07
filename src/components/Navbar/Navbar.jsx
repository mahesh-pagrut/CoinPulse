import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Use NavLink for active styling
import { CoinContext } from '../../context/CoinContext';
import { GiCrystalGrowth } from "react-icons/gi"; // Icon for brand (currently unused)
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the mobile menu toggle
import { FaUserCircle } from "react-icons/fa"; // Icon for the user profile
import './Navbar.css'; // Navbar styles
import logo from '../../assets/logo.png'; // Brand logo

/**
 * Navbar component
 * Displays the website logo, navigation links, currency selector, and profile/auth button.
 */
const Navbar = () => {
    // State for login status simulation
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // State for managing the mobile menu open/close status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State for managing the user profile dropdown
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    
    // Function to apply active/default classes to NavLinks for gradient coloring
    const getNavLinkClass = ({ isActive }) => isActive ? 'active-nav-link' : 'nav-link';

    // Helper functions for closing menus
    const closeMenu = () => setIsMenuOpen(false);
    const closeProfile = () => setIsProfileOpen(false);
    
    // Auth Handlers
    const handleLogin = () => {
        setIsLoggedIn(true); // Simulate successful login
        closeProfile();
        closeMenu();
    }

    const handleLogout = () => {
        setIsLoggedIn(false); // Simulate logout
        closeProfile();
        setIsProfileOpen(false); // Ensure profile menu closes on logout
        closeMenu();
    }


    // --- AUTH RENDER COMPONENTS ---
    
    // Component for the Profile/Logout view (Logged In)
    const ProfileSection = (
        <div className="profile-container">
            <button 
                className="profile-icon-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-label="User Profile Menu"
            >
                {/* The FaUserCircle is used here as the circular profile icon */}
                <FaUserCircle size={30} color="#00eaff" /> 
            </button>
            
            {/* Static Profile Dropdown Menu */}
            {isProfileOpen && (
                <div className="profile-dropdown">
                    <Link to="/" onClick={closeProfile}>Dashboard</Link>
                    <Link to="/" onClick={closeProfile}>Settings</Link>
                    <button onClick={handleLogout} className="dropdown-logout-btn">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
    
    // Component for the Login button (Logged Out)
    const LoginSection = (
        <button onClick={handleLogin}>
            Login
        </button>
    );


    return (
        <div className='navbar'>
            {/* Overlay to catch clicks outside the mobile menu (CLOSES MENU) */}
            {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}

            {/* Brand logo and name linking to homepage */}
            <Link to={'/'} className="brand" onClick={closeMenu}>
                <img src={logo} alt="CoinPulse Logo" className="logo" />
                <span>CoinPulse</span>
            </Link>

            {/* Navigation links (Desktop) & Mobile Menu Overlay/Sidebar */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li onClick={closeMenu}>
                    <NavLink to={'/'} className={getNavLinkClass}>Home</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to={'/features'} className={getNavLinkClass}>Features</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to={'/pricing'} className={getNavLinkClass}>Pricing</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to={'/blogs'} className={getNavLinkClass}>Blogs</NavLink>
                </li>
                {/* Auth section only visible inside the mobile menu */}
                <li className="mobile-auth-placeholder" onClick={closeMenu}>
                    {isLoggedIn ? ProfileSection : LoginSection}
                </li>
            </ul>

            {/* Right section: currency selector, auth/profile, and mobile toggle */}
            <div className="nav-right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EURO</option>
                    <option value="inr">INR</option>
                </select>
                
                {/* Conditional rendering for Login/Profile (Desktop) */}
                <div className="desktop-auth-section">
                    {isLoggedIn ? ProfileSection : LoginSection}
                </div>
                
                {/* Mobile Menu Toggle Button (Hamburger) */}
                <button 
                    className='menu-toggle' 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
