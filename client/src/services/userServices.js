const API_URL = "http://localhost:3000/api/users";


//add user
export const AddingUser = async (name, email, password, role) =>{
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({name, email, password, role}),
  });

  if (!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'Add user failed');
  }

  const data = await response.json();
  return data;
}


//modify user
export const ModifyingUser = async (id, name, email, password, role) => {
  const token = localStorage.getItem('token'); 

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ name, email, password, role }),
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
    console.error('Failed to fetch users:', errorData.message || 'Unknown error');
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