const API_URL = "http://localhost:3000/api/users";

import { Capitalize } from './utils';

//add user
export const AddingUser = async (firstName, lastName, userName, email, password, role) =>{
  
  // Normalize values
  firstName = firstName.trim();
  firstName = Capitalize(firstName);
  lastName = lastName.trim();
  lastName = Capitalize(lastName);
  userName = userName.trim().toLowerCase();
  email = email.trim().toLowerCase();
  password = password.trim();

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, userName, email, password, role }),
  });

  if (!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'Add user failed');
  }

  const data = await response.json();
  return data;
}


//modify user
export const ModifyingUser = async (id, firstName, lastName, userName, email, password, role) => {
  const token = localStorage.getItem('token'); 

  // Normalize values
  firstName = firstName.trim();
  firstName = Capitalize(firstName);
  lastName = lastName.trim();
  lastName = Capitalize(lastName);
  userName = userName.trim().toLowerCase();
  email = email.trim().toLowerCase();
  password = password.trim();

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ firstName, lastName, userName, email, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Update user failed');
  }

  const data = await response.json();
  return data;
};


//get allUsers
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to fetch users: ', errorData.message || 'Unknown error');
    throw new Error(errorData.message || 'Failed to fetch users');
  }

  const data = await response.json();
  return data;
}

//delete a user by id
export const deleteUser = async (id) => {
  const token = localStorage.getItem('token') ;
  

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Delete user failed');
  }

  const data = await response.json();
  return data;
}

// get users count
export const getUsersCount = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch users count');
  }

  const data = await response.json();
  return data.count;
}


//get user by ID
export const GetUserById = async ( id ) => {
  const token = localStorage.getItem('token');   
  if (!token) throw new Error('No authentication token found');
  // console.log("token: " + token);

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 401) {
      throw new Error('Session expired or unauthorized.\nPlease log in again.');
    }
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch user: ', errorData.message || 'Unknown error');
      throw new Error(errorData.message || 'Failed to fetch user');
    }
    const data = await response.json();
    // console.log("Retrieved data by GetUserByID: ",  data);
    return data;

  } catch (error) {
    console.error('Error fetching user by ID: ', error);
    throw error;    
  }
  
};
