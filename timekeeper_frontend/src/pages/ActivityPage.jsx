import React, { useState } from 'react';
import { useActivity } from '../hooks/useActivity';
import { useCategory } from '../hooks/useCategory';
import ActivityList from '../components/activity/ActivityList';
import SearchBar from '../components/common/SearchBar';
import FilterByCategory from '../components/common/FilterByCategory';
import '../styles/ActivityPage.css';

function ActivityPage() {
  const { searchActivities, getActivitiesByCategory } = useActivity();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Filter kegiatan berdasarkan pencarian dan kategori
  let filteredActivities = searchActivities(searchQuery);
  if (selectedCategory) {
    filteredActivities = getActivitiesByCategory(selectedCategory);
  }
  
  return (
    <div className="activity-page">
      <h1>Manajemen Kegiatan</h1>
      
      <div className="filter-controls">
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
      
      <ActivityList 
        activities={filteredActivities}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default ActivityPage;