import React, { useState, useEffect } from 'react';
import { useCategory } from '../../hooks/useCategory';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/CategoryForm.css';

function CategoryForm({ category = null, onClose }) {
  const { createCategory, updateCategory, loading } = useCategory();
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3498db',
  });

  const [validation, setValidation] = useState({
    name: true
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description || '',
        color: category.color || '#3498db',
      });
    }
  }, [category]);

  const validateForm = () => {
    const newValidation = {
      name: formData.name.trim().length >= 3
    };
    setValidation(newValidation);
    return Object.values(newValidation).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    setError(null);
    // Reset validation state for the field
    setValidation(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Mohon periksa kembali form anda');
      return;
    }

    try {
      if (category) {
        await updateCategory(category.id, formData);
      } else {
        await createCategory(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan kategori');
    }
  };

  return (
    <div className="category-form-container">
      <h2>{category ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="category-form">
        <div className={`form-group ${!validation.name ? 'error' : ''}`}>
          <label htmlFor="name">Nama Kategori *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama kategori"
            required
          />
          {!validation.name && (
            <small className="error-text">
              Nama kategori minimal 3 karakter
            </small>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Deskripsi kategori (opsional)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="color">Warna</label>
          <div className="color-picker-container">
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <span className="color-preview" style={{ backgroundColor: formData.color }}>
              {formData.color}
            </span>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-cancel"
            disabled={loading}
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              category ? 'Simpan Perubahan' : 'Tambah Kategori'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;