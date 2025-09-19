const API_URL = "http://localhost:3000/auth";

import { Capitalize } from './utils';

// Sign in
export const SignIn = async (email, password) =>{

  email = email.trim().toLowerCase();
  password = password.trim();
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({email, password}),
  });

  if (!response.ok){
    const errorData = await response.json();
    // throw new Error(errorData.message || 'User login failed');
    throw new Error('User login failed');
  }  
  sessionStorage.clear();
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.user._id);  
  localStorage.setItem('userName', data.user.userName);
  localStorage.setItem('firstName', data.user.firstName);
  localStorage.setItem('lastName', data.user.lastName);  
  localStorage.setItem('email', data.user.email);
  localStorage.setItem('role', data.user.role);
  return data;
}

// Sign up
export const Register = async (firstName, lastName, userName, email, password) =>{

  // Normalize values
  firstName = firstName.trim();
  firstName = Capitalize(firstName);
  lastName = lastName.trim();
  lastName = Capitalize(lastName);
  userName = userName.trim().toLowerCase();
  email = email.trim().toLowerCase();
  password = password.trim();
  // Register user
  const response = await fetch(`http://localhost:3000/api/users`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({firstName, lastName, userName, email, password}),
  });

  if (!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registering user failed');
  }
  const data = await response.json();
  return data;
}


//this one is only for debugging in order to know which part went wrong, when there is no error, we will switch to the code above
// const API_URL = "http://localhost:3000/auth";

// export const SignIn = async (email, password) => {
//   try {
//     const response = await fetch(`${API_URL}/signin`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const contentType = response.headers.get('content-type');
//     console.log('Response content type:', contentType);

//     if (!response.ok) {
//       if (contentType && contentType.includes('application/json')) {
//         const errorData = await response.json();
//         console.log('Error data:', errorData);
//         throw new Error(errorData.message || 'User login failed');
//       } else {
//         // Log the full response for further investigation
//         const errorText = await response.text();
//         console.error('Non-JSON response:', errorText);
//         throw new Error('User login failed with non-JSON response');
//       }
//     }

//     if (contentType && contentType.includes('application/json')) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error('Expected JSON response but got something else');
//     }
//   } catch (error) {
//     console.error('Error signing in:', error);
//     throw error;
//   }
// };