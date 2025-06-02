const API_URL = 'http://127.0.0.1:6543/api';

export const fetchActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`);
    if (!response.ok) throw new Error('Gagal mengambil data aktivitas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createActivity = async (activityData) => {
  try {
    const response = await fetch('http://127.0.0.1:6543/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: activityData.name,
        description: activityData.description || '',
        category_id: activityData.categoryId, // Pastikan nama field sesuai dengan API
        date: activityData.date,
        time: activityData.time
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal membuat aktivitas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

export const updateActivity = async (id, activityData) => {
  try {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) throw new Error('Gagal mengupdate aktivitas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Gagal menghapus aktivitas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/activities/${id}`);
    if (!response.ok) throw new Error('Gagal mengambil detail aktivitas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};