const API_URL = "http://localhost:3000";

export const signOut = async () => {

  try {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }
    return await response.json();
    
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};