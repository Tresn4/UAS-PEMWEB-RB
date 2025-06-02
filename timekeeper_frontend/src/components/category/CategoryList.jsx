import React, { useState, useCallback } from 'react';
import { useCategory } from '../../hooks/useCategory';
import { useActivity } from '../../hooks/useActivity';
import CategoryForm from './CategoryForm';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/CategoryList.css';

function CategoryList() {
  const { categories, deleteCategory, loading, error } = useCategory();
  const { activities } = useActivity();
  
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = useCallback((category) => {
    setSelectedCategory(category);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(async (id) => {
    const isUsed = activities.some(activity => activity.categoryId === id);
    
    if (isUsed) {
      alert('Kategori ini digunakan dalam beberapa kegiatan. Harap hapus atau ubah kegiatan tersebut terlebih dahulu.');
      return;
    }
    
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        await deleteCategory(id);
        alert('Kategori berhasil dihapus');
      } catch (error) {
        alert('Gagal menghapus kategori: ' + error.message);
      }
    }
  }, [activities, deleteCategory]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setSelectedCategory(null);
  }, []);

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="category-list-container">
      <div className="category-list-header">
        <h2>Daftar Kategori</h2>
        <div className="category-actions">
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="btn-add" 
            onClick={() => setShowForm(true)}
          >
            Tambah Kategori
          </button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <p className="no-categories">
          {searchTerm 
            ? `Tidak ada kategori yang cocok dengan "${searchTerm}"`
            : "Tidak ada kategori yang ditemukan."}
        </p>
      ) : (
        <div className="category-grid">
          {filteredCategories.map(category => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ borderLeft: `5px solid ${category.color || '#3498db'}` }}
            >
              <div className="category-card-content">
                <h3>{category.name}</h3>
                {category.description && <p>{category.description}</p>}
                <div className="category-stats">
                  <small>
                    {activities.filter(a => a.categoryId === category.id).length} aktivitas
                  </small>
                </div>
              </div>
              <div className="category-card-actions">
                <button 
                  className="btn-edit" 
                  onClick={() => handleEdit(category)}
                  title="Edit kategori"
                >
                  Edit
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(category.id)}
                  title="Hapus kategori"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>&times;</span>
            <CategoryForm 
              category={selectedCategory} 
              onClose={handleCloseForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;