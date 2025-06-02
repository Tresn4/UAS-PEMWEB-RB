import React, { useState, useEffect } from 'react';
import { useActivity } from '../../hooks/useActivity';
import { useCategory } from '../../hooks/useCategory';
import ActivityForm from './ActivityForm';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/ActivityList.css';

function ActivityList() {
  const { 
    activities, 
    loading, 
    error, 
    deleteActivity, 
    searchActivities 
  } = useActivity();
  
  const { categories } = useCategory();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    console.log('Current activities:', activities);
  }, [activities]);

  const filteredActivities = searchActivities(searchQuery, selectedCategory);

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      try {
        await deleteActivity(id);
        alert('Kegiatan berhasil dihapus');
      } catch (err) {
        alert('Gagal menghapus kegiatan: ' + err.message);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedActivity(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak ada kategori';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="activity-list-container">
      <div className="activity-list-header">
        <h2>Daftar Kegiatan</h2>
        <div className="activity-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button 
            className="btn-add" 
            onClick={() => setShowForm(true)}
          >
            Tambah Kegiatan
          </button>
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <p className="no-activities">
          {searchQuery || selectedCategory 
            ? 'Tidak ada kegiatan yang sesuai dengan filter.'
            : 'Belum ada kegiatan yang ditambahkan.'}
        </p>
      ) : (
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>
                    <span 
                      className="category-badge"
                      style={{ 
                        backgroundColor: categories.find(
                          cat => cat.id === activity.categoryId
                        )?.color || '#ddd' 
                      }}
                    >
                      {getCategoryName(activity.categoryId)}
                    </span>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString('id-ID')}</td>
                  <td>{activity.time || '-'}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-edit" 
                      onClick={() => handleEdit(activity)}
                      title="Edit kegiatan"
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(activity.id)}
                      title="Hapus kegiatan"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>&times;</span>
            <ActivityForm 
              activity={selectedActivity} 
              onClose={handleCloseForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityList;