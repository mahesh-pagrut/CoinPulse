
import React from 'react'
import './Navbar.css'
import logo from "../../assets/logo.png"
import arrow from "../../assets/arrow_icon.png"
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'

const Navbar = () => {
    const {setCurrency} = useContext(CoinContext)

    const currencyHandler =(event)=>{
        switch(event.target.value){
            case "usd" : {
                setCurrency({name: "usd" , symbol: "$"})
                break;
            }
            case "eur" : {
                setCurrency({name: "eur" , symbol: "€"})
                break;
            }
            case "inr" : {
                setCurrency({name: "inr" , symbol: "₹"})
                break;
            }
            default : {
                setCurrency({name: "usd" , symbol: "$"})
                break;
            }
        }

    }

  return (
    <div className='navbar'>
        <img src={logo}  alt='logo-on-navbar' className='logo'/>
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blogs</li>
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}>
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
                <option value="INR">INR</option>
            </select>
            <button>Sign Up <img src={arrow} alt="arrow-icon"/></button>
        </div>
    </div>
  )
}

export default Navbar