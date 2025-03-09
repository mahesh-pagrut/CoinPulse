
import React from 'react'
import './Navbar.css'
import logo from "../../assets/logo.png"
import arrow from "../../assets/arrow_icon.png"


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo}  alt='logo-on-navbar' />
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blogs</li>
        </ul>
        <div className="nav-right">
            <select>
                <option value="USD"></option>
                <option value="EURO"></option>
                <option value="INR"></option>
            </select>
            <button>Sign Up <img src={arrow} alt="arrow-icon"/></button>
        </div>
    </div>
  )
}

export default Navbar