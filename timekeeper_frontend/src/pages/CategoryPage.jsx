import React from 'react';
import CategoryList from '../components/category/CategoryList';
import '../styles/CategoryPage.css';

function CategoryPage() {
  return (
    <div className="category-page">
      <h1>Manajemen Kategori</h1>
      <p className="page-description">
        Kelola kategori untuk mengorganisir kegiatan Anda dengan lebih baik.
      </p>
      <CategoryList />
    </div>
  );
}

export default CategoryPage;