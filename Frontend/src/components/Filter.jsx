// src/components/Filter.js

import React, { useState } from 'react';

const Filter = ({ onCategoryChange, onPriceChange }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Handle Category Change
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    onCategoryChange(value); // Pass the selected category back to parent
  };

  // Handle Price Change
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
    onPriceChange(value); // Pass the selected price filter back to parent
  };

  return (
    <div className="filter-container">
      <div className="filter-category">
        <h3>Category</h3>
        <label>
          <input 
            type="radio" 
            name="category" 
            value="men" 
            checked={category === 'men'} 
            onChange={handleCategoryChange} 
          />
          Men
        </label>
        <label>
          <input 
            type="radio" 
            name="category" 
            value="women" 
            checked={category === 'women'} 
            onChange={handleCategoryChange} 
          />
          Women
        </label>
        <label>
          <input 
            type="radio" 
            name="category" 
            value="kid" 
            checked={category === 'kid'} 
            onChange={handleCategoryChange} 
          />
          Kid
        </label>
      </div>

      <div className="filter-price">
        <h3>Price</h3>
        <label>
          <input 
            type="radio" 
            name="price" 
            value="lessThan1000" 
            checked={priceRange === 'lessThan1000'} 
            onChange={handlePriceChange} 
          />
          Less than 1000
        </label>
        <label>
          <input 
            type="radio" 
            name="price" 
            value="1000To5000" 
            checked={priceRange === '1000To5000'} 
            onChange={handlePriceChange} 
          />
          1000 - 5000
        </label>
        <label>
          <input 
            type="radio" 
            name="price" 
            value="greaterThan5000" 
            checked={priceRange === 'greaterThan5000'} 
            onChange={handlePriceChange} 
          />
          Greater than 5000
        </label>
      </div>
    </div>
  );
};

export default Filter;
