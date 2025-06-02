import { useState, useEffect } from 'react';
import { 
  fetchActivities, 
  createActivity as apiCreateActivity,
  updateActivity as apiUpdateActivity,
  deleteActivity as apiDeleteActivity
} from '../API';

export function useActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchActivities();
      console.log('Raw activities data:', data);
      
      // Validate and transform data
      const activitiesList = data?.activities || [];
      if (!Array.isArray(activitiesList)) {
        throw new Error('Data aktivitas tidak valid');
      }

      // Transform dates and validate required fields
      const processedActivities = activitiesList.map(activity => ({
        ...activity,
        date: activity.date || new Date().toISOString().split('T')[0],
        time: activity.time || new Date().toTimeString().slice(0,5),
        name: activity.name?.trim() || 'Tidak ada nama',
        description: activity.description?.trim() || '',
        categoryId: activity.category_id || activity.categoryId || null
      }));

      console.log('Processed activities:', processedActivities);
      setActivities(processedActivities);
      setLastUpdate(new Date().toISOString());
      setError(null);
    } catch (err) {
      console.error('Error in loadActivities:', err);
      setError('Gagal memuat aktivitas: ' + err.message);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const searchActivities = (query = '', categoryId = null) => {
    if (!query.trim() && !categoryId) {
      return activities;
    }

    return activities.filter(activity => {
      const matchesQuery = !query.trim() || 
        activity?.name?.toLowerCase().includes(query.toLowerCase()) ||
        activity?.description?.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !categoryId || 
        activity.categoryId === categoryId;

      return matchesQuery && matchesCategory;
    });
  };

  const validateActivityData = (data) => {
    if (!data.name?.trim()) {
      throw new Error('Nama aktivitas wajib diisi');
    }
    if (!data.date) {
      throw new Error('Tanggal wajib diisi');
    }
    if (!data.time) {
      throw new Error('Waktu wajib diisi');
    }
    if (!data.categoryId) {
      throw new Error('Kategori wajib dipilih');
    }
  };

  const createActivity = async (activityData) => {
    try {
      validateActivityData(activityData);
      setLoading(true);
      const result = await apiCreateActivity(activityData);
      await loadActivities();
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Gagal membuat aktivitas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      validateActivityData(activityData);
      setLoading(true);
      const result = await apiUpdateActivity(id, activityData);
      await loadActivities();
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Gagal mengupdate aktivitas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      if (!id) {
        throw new Error('ID aktivitas tidak valid');
      }
      setLoading(true);
      const result = await apiDeleteActivity(id);
      await loadActivities();
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Gagal menghapus aktivitas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    activities,
    loading,
    error,
    lastUpdate,
    createActivity,
    updateActivity,
    deleteActivity,
    searchActivities,
    refreshActivities: loadActivities
  };
}