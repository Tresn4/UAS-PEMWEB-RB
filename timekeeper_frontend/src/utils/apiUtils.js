export const API_BASE_URL = 'http://127.0.0.1:6543/api';

export const checkResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.message);
    } catch (e) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
  }
  return response.json();
};