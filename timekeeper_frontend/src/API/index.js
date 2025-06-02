import { checkResponse, API_BASE_URL } from '../utils/apiUtils';

// Activities API
export const fetchActivities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`);
    const data = await checkResponse(response);
    console.log('Activities API Response:', data); // Add logging
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const createActivity = async (activityData) => {
  try {
    console.log('Creating activity with data:', activityData); // Add logging
    
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: activityData.name,
        description: activityData.description,
        category_id: activityData.categoryId,
        date: activityData.date,
        time: activityData.time
      })
    });
    
    const result = await checkResponse(response);
    console.log('Create activity response:', result); // Add logging
    return result;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

export const updateActivity = async (id, activityData) => {
  const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: activityData.name,
      description: activityData.description,
      category_id: activityData.categoryId,
      date: activityData.date,
      time: activityData.time
    })
  });
  return checkResponse(response);
};

export const deleteActivity = async (id) => {
  const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
    method: 'DELETE',
  });
  return checkResponse(response);
};

// Categories API
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return checkResponse(response);
};

export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData)
  });
  return checkResponse(response);
};

export const updateCategory = async (id, categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData)
  });
  return checkResponse(response);
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  return checkResponse(response);
};