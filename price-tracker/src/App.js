import React, { useState, useEffect } from 'react';

// The entire CSS provided, including the RGB glow logic, is placed here
// to make the component self-contained and runnable in the preview environment.
const globalStyles = `
/* src/App.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-webkit-font-smoothing: grayscale;
  
  /* Set default text color to light for readability on dark background */
  color: #f9fafb; 

  /* ---------------------------------------------------- */
  /* REVERTED: DARK PLASMA EFFECT (Green, Orange, Dark-Grey) */
  
  /* Define the custom gradient with dark, desaturated colors */
  background: linear-gradient(
      135deg, 
      #1d2333, /* Deep Blue-Grey (Base) */
      #2a3a2b, /* Dark, desaturated Green */
      #3d2c22, /* Dark, desaturated Orange/Brown */
      #1d2333, /* Deep Blue-Grey (Base) */
      #2f2f2f  /* Medium Dark Grey for subtle 'white' blend */
  );
  
  /* Make the gradient huge for soft, ambient shifts */
  background-size: 400% 400%; 
  background-attachment: fixed; 
  
  /* Apply a subtle, slow animation */
  animation: colorShift 35s ease-in-out infinite; 
  /* ---------------------------------------------------- */
}

/* ---------------------------------------------------- */
/* NEW KEYFRAME FOR PLASMA SHIFT */
@keyframes colorShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
/* ---------------------------------------------------- */


/* The starfield/grid layer div is removed from the DOM, but its class is kept empty for safety. */
.starfield-layer1 {
  display: none;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  /* Add z-index to ensure content is above the moving background */
  position: relative;
  z-index: 10;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  /* H1 is now light for contrast against the dark background */
  color: #f9fafb; 
}

/* ---------------------------------------------------- */
/* SOCIAL BUTTON STYLES (Constant, Elegant RGB Glow) */

.social-links {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  gap: 1.5rem; /* Increased gap */
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

/* ---------------------------------------------------- */
/* GLOW WRAPPER: Base styles for all social buttons */
.social-glow-container {
  position: relative;
  padding: 2px; /* Padding for the glow effect */
  border-radius: 15px; /* Adjusted border radius for elegant look */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden; 
  transition: box-shadow 0.3s ease;
}

/* ::after element defines the constant RGB glow */
.social-glow-container::after {
  content: '';
  position: absolute;
  top: -4px; /* Increased offset for larger glow area */
  left: -4px;
  right: -4px;
  bottom: -4px;
  
  /* Full RGB Gradient (like the search bar) */
  background: linear-gradient(
    45deg,
    #ff0066, /* Pink */
    #ff6600, /* Orange */
    #e6e600, /* Yellow */
    #00cc99, /* Teal */
    #0066ff, /* Blue */
    #cc00ff  /* Purple */
  );
  background-size: 300% 300%;
  border-radius: 19px;
  z-index: -1;
  opacity: 1; /* CONSTANTLY VISIBLE GLOW */
  filter: blur(8px); /* Softer, more elegant blur */
  transition: none; /* Removed transition for constant effect */
  animation: gradientShift 8s linear infinite; /* Slower, continuous rotation */
}


/* Base style for the actual button element (Minimal & Elegant) */
.social-button {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 12px 24px; /* More elegant padding */
  border-radius: 12px; /* Tighter radius for minimal look */
  text-decoration: none;
  font-weight: 600; /* Slightly less bold */
  font-size: 1rem;
  letter-spacing: 0.05em; /* Increased spacing for better font style */
  text-transform: uppercase; /* Added subtle uppercase style */
  color: white; 
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); /* Reduced text shadow */
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Reduced shadow for minimal look */
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s;
}

.social-button:hover {
  transform: translateY(-1px); /* Subtle lift on hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Slightly reduced hover shadow */
}

.social-button:active {
  transform: scale(0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}


/* Specific Gradients (Internal Button Color) */

.social-button.instagram {
  /* Original Instagram Radial Gradient */
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}

.social-button.website {
  /* Requested Green Gradient */
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.social-button.daraz {
  /* Daraz Orange Gradient */
  background: linear-gradient(90deg, #ff5b00 0%, #ff7b2b 100%);
}

.social-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
}

/* ---------------------------------------------------- */
/* KEYFRAMES */

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* ---------------------------------------------------- */
/* NEW RGB SEARCH BAR STYLES */

.search-glow-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 28px;
  padding: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.search-glow-wrapper::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  
  background: linear-gradient(
    45deg,
    #ff0066, #ff6600, #e6e600, #00cc99, #0066ff, #cc00ff
  );
  background-size: 300% 300%;
  border-radius: 30px;
  z-index: -1;
  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.5s ease, background-position 1s ease;
  animation: gradientShift 5s ease infinite alternate;
}

.search-glow-wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05); 
}

.search-glow-wrapper:focus-within::after {
  opacity: 1;
  background-position: 100% 50%;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border-radius: 24px;
  border: 1px solid #d2d2d7;
  font-size: 1rem;
  /* Keep search input light */
  background-color: #fff; 
  transition: border-color 0.3s ease;
  display: block;
  /* Keep text dark inside the search bar */
  color: #1d1d1f; 
}

.search-input:focus {
  outline: none;
  border-color: transparent;
}

/* ---------------------------------------------------- */
/* NEW PRODUCT LIST STYLES */

.product-list {
  display: flex;
  flex-direction: column;
  gap: 12px; /* Spacing between list items */
  margin-top: 3rem;
  max-width: 700px; /* Constraining width for a cleaner list */
  margin-left: auto;
  margin-right: auto;
}

.list-item {
  /* Keep list items bright white for maximum contrast */
  background-color: #ffffff; 
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: default;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Slightly darker shadow on hover */
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-name {
  font-size: 1.05rem;
  font-weight: 600;
  /* Keep text dark inside the list item */
  color: #1d1d1f; 
}

.item-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ff5b00; /* Daraz orange for price emphasis */
  flex-shrink: 0; /* Prevents price from shrinking */
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
`;

// Helper component for cycling colors (since we don't have real status data)
const getStatusColor = (id) => {
    // Cycle through a few vibrant colors for visual distinction
    const colors = ['#10b981', '#ff6600', '#0066ff', '#cc00ff']; // Green, Orange, Blue, Purple
    return colors[id % colors.length];
};

// Refactored from ProductCard to a ProductListItem
const ProductListItem = ({ id, name, retail_price }) => {
    const statusColor = getStatusColor(id);
    
    return (
        <div className="list-item">
            <div className="item-info">
                {/* Colored Dot for differentiation */}
                <div className="status-dot" style={{ backgroundColor: statusColor }} title="Status Indicator"></div>
                <span className="item-name">{name}</span>
            </div>
            <span className="item-price">Rs. {retail_price}</span>
        </div>
    );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component loads
  useEffect(() => {
    setIsLoading(true);
    // Note: This API call uses a local server address (http://127.0.0.1:5000), 
    // which may not work in a sandboxed environment.
    fetch('http://127.0.0.1:5000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        // Set the error state and stop loading. 
        setError("Could not fetch products. Please ensure the server (http://127.0.0.1:5000) is running.");
        setIsLoading(false);
      });
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Inject all custom styles into the DOM for a runnable preview */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <div className="starfield-layer1"></div>

      <div className="app-container">
        <header className="app-header">
          <h1>EGS Retail Price Checker</h1>
          
          {/* Social Media and Website Buttons */}
          <div className="social-links">
            
            {/* Instagram Button with Constant RGB Glow Wrapper */}
            <div className="social-glow-container">
                <a href="https://www.instagram.com/elitegrocery" target="_blank" rel="noopener noreferrer" className="social-button instagram">
                  {/* Instagram Icon (Lucide SVG) */}
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram
                </a>
            </div>

            {/* Daraz Button with Constant RGB Glow Wrapper */}
            <div className="social-glow-container">
                <a href="https://www.daraz.pk/shop/elite-stock" target="_blank" rel="noopener noreferrer" className="social-button daraz">
                  {/* Box Icon for Daraz (Lucide SVG) */}
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8"/><path d="m3 7 8 5 8-5"/><path d="M12 22V12"/></svg>
                  Daraz
                </a>
            </div>

            {/* Website Button (Green) with Constant RGB Glow Wrapper */}
            <div className="social-glow-container">
                <a href="https://www.elitegrocerystore.com" target="_blank" rel="noopener noreferrer" className="social-button website">
                  {/* Globe Icon (Lucide SVG) */}
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z"/><path d="M2 12h20"/></svg>
                  Website
                </a>
            </div>
          </div>

          {/* RGB Search Bar Structure */}
          <div className="search-glow-wrapper">
            <input
              type="search"
              placeholder="Search for a product..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        
        <main className="product-list">
          {isLoading ? (
            <p className="text-center col-span-full mt-8 text-gray-400">Loading products...</p>
          ) : error ? (
            <p className="text-center col-span-full mt-8 text-red-400">{error}</p>
          ) : (
            filteredProducts.map(product => (
              <ProductListItem 
                key={product.id} 
                id={product.id} // Pass ID for color cycling
                name={product.name}
                retail_price={product.retail_price}
              />
            ))
          )}
          
          {filteredProducts.length === 0 && !isLoading && !error && (
            <p className="text-center col-span-full mt-8 text-gray-400">
              {products.length > 0 ? `No products found matching "${searchTerm}".` : 'No products loaded yet.'}
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
