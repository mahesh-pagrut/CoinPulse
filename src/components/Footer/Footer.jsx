import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright © 2024 - CoinPulse - Get the pulse of the crypto market - All rights Reserved</p>

      {/* Developer Info */}
      <div className="developer-info">
        <div className="social-links">
        <p>Developed by Mahesh Pagrut</p>
          <a href="https://www.instagram.com/imaxvibe/?igsh=bHJkcG8yM2ZnNmEx#" 
             target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.linkedin.com/in/mahesh-pagrut-%F0%9F%8E%AE-887535274/" 
             target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
          <a href="https://portfolio-wg4w.vercel.app/" 
             target="_blank" rel="noopener noreferrer">
            <CgWebsite className="social-icon portfolio" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
