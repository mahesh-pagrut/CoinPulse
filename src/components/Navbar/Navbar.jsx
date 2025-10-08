import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { setCurrency } = useContext(CoinContext);

    // Currency handler
    const handleCurrencyChange = (e) => {
        const currencyMap = {
            usd: { name: "usd", symbol: "$" },
            eur: { name: "eur", symbol: "€" },
            inr: { name: "inr", symbol: "₹" }
        };
        setCurrency(currencyMap[e.target.value] || currencyMap.usd);
    };

    // Toggle functions
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    
    const closeMenu = () => setIsMenuOpen(false);
    const closeProfile = () => setIsProfileOpen(false);

    // Auth handlers
    const handleLogin = () => {
        setIsLoggedIn(true);
        closeMenu();
        closeProfile();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        closeMenu();
        closeProfile();
    };

    // Active link class
    const navLinkClass = ({ isActive }) => isActive ? 'active-nav-link' : 'nav-link';

    return (
        <nav className='navbar'>
            {/* Brand */}
            <Link to='/' className='brand' onClick={closeMenu}>
                <img src={logo} alt='CoinPulse' className='logo' />
                <span>CoinPulse</span>
            </Link>

            {/* Nav Links */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><NavLink to='/' className={navLinkClass} onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to='/features' className={navLinkClass} onClick={closeMenu}>Features</NavLink></li>
                <li><NavLink to='/pricing' className={navLinkClass} onClick={closeMenu}>Pricing</NavLink></li>
                <li><NavLink to='/blogs' className={navLinkClass} onClick={closeMenu}>Blogs</NavLink></li>
                
                {/* Mobile Auth Section - Only visible on mobile */}
                <li className='mobile-auth'>
                    {isLoggedIn ? (
                        <>
                            <Link to='/' onClick={closeMenu} style={{color: '#e0e0e0', textDecoration: 'none', display: 'block', padding: '10px 0'}}>Dashboard</Link>
                            <Link to='/' onClick={closeMenu} style={{color: '#e0e0e0', textDecoration: 'none', display: 'block', padding: '10px 0'}}>Settings</Link>
                            <button onClick={handleLogout} className='auth-btn' style={{marginTop: '10px', width: '100%'}}>Logout</button>
                        </>
                    ) : (
                        <button onClick={handleLogin} className='auth-btn' style={{width: '100%'}}>Login/Signup</button>
                    )}
                </li>
            </ul>

            {/* Right Section */}
            <div className='nav-right'>
                {/* Currency Selector */}
                <select onChange={handleCurrencyChange}>
                    <option value='usd'>USD</option>
                    <option value='eur'>EURO</option>
                    <option value='inr'>INR</option>
                </select>

                {/* Desktop Auth - Only visible on desktop */}
                <div className='desktop-auth'>
                    {isLoggedIn ? (
                        <div className='profile-container'>
                            <FaUserCircle 
                                size={30} 
                                color='#00eaff' 
                                className='profile-icon'
                                onClick={toggleProfile}
                            />
                            {isProfileOpen && (
                                <div className='profile-dropdown'>
                                    <Link to='/' onClick={closeProfile}>Dashboard</Link>
                                    <Link to='/' onClick={closeProfile}>Settings</Link>
                                    <button onClick={handleLogout} className='logout-btn'>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={handleLogin} className='auth-btn'>Login/Signup</button>
                    )}
                </div>

                {/* Hamburger Menu */}
                <button className='menu-toggle' onClick={toggleMenu} aria-label='Toggle menu'>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;