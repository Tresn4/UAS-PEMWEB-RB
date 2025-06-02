import { useState, useEffect } from 'react';
import { 
  fetchCategories, 
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory
} from '../API';

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchCategories();
      setCategories(response.categories);
      setError(null);
    } catch (err) {
      setError('Gagal memuat kategori: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = async (categoryData) => {
    try {
      setLoading(true);
      await apiCreateCategory(categoryData);
      await loadCategories(); // Refresh list after create
      return true;
    } catch (err) {
      setError('Gagal membuat kategori: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      setLoading(true);
      await apiUpdateCategory(id, categoryData);
      await loadCategories(); // Refresh list after update
      return true;
    } catch (err) {
      setError('Gagal mengupdate kategori: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await apiDeleteCategory(id);
      await loadCategories(); // Refresh list after delete
      return true;
    } catch (err) {
      setError('Gagal menghapus kategori: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: loadCategories
  };
}