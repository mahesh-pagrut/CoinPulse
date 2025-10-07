import React from 'react';
import './Blogs.css'; // Import the corresponding CSS file
import { Link } from 'react-router-dom';

/**
 * Blogs component
 * A placeholder page for future blog/article content.
 */
const Blogs = () => {
    return (
        // Reusing the 'home' class for general page padding and background styling
        <div className='home'> 
            {/* Reusing the 'hero' class for a centered, main content block */}
            <div className='hero'>
                <h1>Latest Crypto Insights & News</h1>
                <p>
                    This is where you'll find our in-depth articles, market analyses, and guides on the world of cryptocurrency.
                    Content coming soon!
                </p>
                {/* Adding a button that directs back to the home page */}
                <Link to="/">
                    <button>Go to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Blogs;