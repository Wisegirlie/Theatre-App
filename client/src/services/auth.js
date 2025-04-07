const API_URL = "http://localhost:3000";

export const signOut = async () => {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign out failed');
    }
  
    const data = await response.json();
    return data;
  };