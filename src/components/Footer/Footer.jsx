import React from "react";
import "./Footer.css"; // Import footer-specific styles
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons
import { CgWebsite } from "react-icons/cg"; // Import portfolio icon

/**
 * Footer component
 * Displays copyright information and developer social links
 */
const Footer = () => {
  return (
    <div className="footer">
      
      {/* Copyright information */}
      <p>
        Copyright © 2024 - CoinPulse - Get the pulse of the crypto market - All rights Reserved
      </p>

      {/* Developer information section */}
      <div className="developer-info">

        {/* Social media and portfolio links */}
        <div className="social-links">
          <p>Developed by Mahesh Pagrut</p>

          {/* Instagram link */}
          <a 
            href="https://www.instagram.com/imaxvibe/?igsh=bHJkcG8yM2ZnNmEx#" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon instagram" />
          </a>

          {/* LinkedIn link */}
          <a 
            href="https://www.linkedin.com/in/mahesh-pagrut-%F0%9F%8E%AE-887535274/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon linkedin" />
          </a>

          {/* Personal portfolio link */}
          <a 
            href="https://portfolio-wg4w.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <CgWebsite className="social-icon portfolio" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
