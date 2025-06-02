import React from 'react';
import '../../styles/SearchBar.css';

function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;