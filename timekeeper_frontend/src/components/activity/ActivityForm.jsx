import React, { useState, useEffect } from 'react';
import { useActivity } from '../../hooks/useActivity';  // Tambahkan import ini
import { useCategory } from '../../hooks/useCategory';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/ActivityForm.css';

function ActivityForm({ activity = null, onClose }) {
  const { createActivity, updateActivity, loading } = useActivity();
  const { categories } = useCategory(); // Tambahkan ini untuk mengambil daftar kategori
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '', // Tambahkan ini untuk menyimpan ID kategori
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0,5)
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        name: activity.name,
        description: activity.description || '',
        categoryId: activity.categoryId || '',
        date: activity.date,
        time: activity.time
      });
    }
  }, [activity]);

  const handleSubmit = async (e) => {
  e.preventDefault();
    
  // Validasi data
  if (!formData.name.trim()) {
    setError('Nama aktivitas wajib diisi');
    return;
  }

  if (!formData.categoryId) {
    setError('Kategori wajib dipilih');
    return;
  }

  try {
    const dataToSubmit = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      categoryId: formData.categoryId,
      date: formData.date,
      time: formData.time
    };

    if (activity) {
      await updateActivity(activity.id, dataToSubmit);
    } else {
      await createActivity(dataToSubmit);
    }
    onClose();
  } catch (err) {
    setError(err.message || 'Terjadi kesalahan saat menyimpan aktivitas');
  }
};

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h2>{activity ? 'Edit Aktivitas' : 'Tambah Aktivitas Baru'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nama Aktivitas *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          value={formData.categoryId}
          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          required
          className="form-select"
        >
          <option value="">Pilih Kategori</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Deskripsi</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Tanggal *</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Waktu *</label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn-cancel">
          Batal
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : (activity ? 'Simpan' : 'Tambah')}
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;