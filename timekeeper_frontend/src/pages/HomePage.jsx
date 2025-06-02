import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useActivity } from '../hooks/useActivity';
import { useCategory } from '../hooks/useCategory';
import SearchBar from '../components/common/SearchBar';
import FilterByCategory from '../components/common/FilterByCategory';
import '../styles/HomePage.css';

function HomePage() {
  const { activities, searchActivities } = useActivity();
  const { categories } = useCategory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter kegiatan berdasarkan pencarian dan kategori
  let filteredActivities = searchActivities(searchQuery);
  if (selectedCategory) {
    filteredActivities = filteredActivities.filter(
      activity => activity.categoryId === selectedCategory
    );
  }

  // Ambil 5 kegiatan terbaru
  const recentActivities = [...filteredActivities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak ada kategori';
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Selamat Datang di Time Keeper</h1>
        <p>Kelola kegiatan Anda dengan mudah dan efisien</p>
        <div className="hero-buttons">
          <Link to="/activities" className="btn-primary">Lihat Kegiatan</Link>
          <Link to="/categories" className="btn-secondary">Kelola Kategori</Link>
        </div>
      </section>

      <section className="search-section">
        <h2>Cari Kegiatan</h2>
        <div className="search-controls">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kegiatan berdasarkan nama..."
          />
          <FilterByCategory
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <section className="recent-activities">
        <h2>Kegiatan Terbaru</h2>
        {recentActivities.length === 0 ? (
          <p className="no-activities">Tidak ada kegiatan yang ditemukan.</p>
        ) : (
          <div className="activity-cards">
            {recentActivities.map(activity => {
              const category = categories.find(cat => cat.id === activity.categoryId);
              return (
                <div
                  key={activity.id}
                  className="activity-card"
                  style={{ borderLeft: `5px solid ${category?.color || '#3498db'}` }}
                >
                  <h3>{activity.name}</h3>
                  <p className="category-name">{getCategoryName(activity.categoryId)}</p>
                  {activity.description && (
                    <p className="activity-description">{activity.description}</p>
                  )}
                  {(activity.date || activity.time) && (
                    <p className="activity-datetime">
                      {activity.date && <span>{activity.date}</span>}
                      {activity.time && <span> - {activity.time}</span>}
                    </p>
                  )}
                  <Link to="/activities" className="view-details">
                    Lihat Detail
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="view-all">
          <Link to="/activities" className="btn-view-all">
            Lihat Semua Kegiatan
          </Link>
        </div>
      </section>

      <section className="stats-section">
        <h2>Statistik</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Kegiatan</h3>
            <p className="stat-number">{activities.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Kategori</h3>
            <p className="stat-number">{categories.length}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;