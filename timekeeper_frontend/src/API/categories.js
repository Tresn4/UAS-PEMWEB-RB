const API_URL = 'http://127.0.0.1:6543/api';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Gagal mengambil data kategori');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Gagal membuat kategori');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Gagal mengupdate kategori');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Gagal menghapus kategori');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};