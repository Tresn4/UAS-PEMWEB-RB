import React from 'react';
import { useCategory } from '../../hooks/useCategory';
import '../../styles/FilterByCategory.css';

function FilterByCategory({ selectedCategory, onCategoryChange }) {
  const { categories } = useCategory();
  
  return (
    <div className="filter-by-category">
      <label htmlFor="category-filter">Filter berdasarkan kategori:</label>
      <select
        id="category-filter"
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
      >
        <option value="">Semua Kategori</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByCategory;