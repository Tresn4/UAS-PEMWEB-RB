import React from 'react';
import { useCategory } from '../../hooks/useCategory';
import '../../styles/ActivityDetail.css';

function ActivityDetail({ activity, onClose, onEdit, onDelete }) {
  const { categories } = useCategory();
  
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak ada kategori';
  };

  return (
    <div className="activity-detail">
      <div className="activity-detail-header">
        <h2>{activity.name}</h2>
        <span className="close-button" onClick={onClose}>&times;</span>
      </div>
      
      <div className="activity-detail-content">
        <div className="detail-item">
          <span className="label">Kategori:</span>
          <span className="value">{getCategoryName(activity.categoryId)}</span>
        </div>
        
        {activity.description && (
          <div className="detail-item">
            <span className="label">Deskripsi:</span>
            <span className="value">{activity.description}</span>
          </div>
        )}
        
        {activity.date && (
          <div className="detail-item">
            <span className="label">Tanggal:</span>
            <span className="value">{activity.date}</span>
          </div>
        )}
        
        {activity.time && (
          <div className="detail-item">
            <span className="label">Waktu:</span>
            <span className="value">{activity.time}</span>
          </div>
        )}
        
        <div className="detail-actions">
          <button 
            className="btn-edit" 
            onClick={onEdit}
          >
            Edit
          </button>
          <button 
            className="btn-delete" 
            onClick={onDelete}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;