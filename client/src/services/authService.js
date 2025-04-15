const API_URL = "http://localhost:3000/auth";

// Sign in
export const SignIn = async (email, password) =>{
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({email, password}),
  });

  if (!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'User login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.user._id);
  localStorage.setItem('name', data.user.name);
  localStorage.setItem('email', data.user.email);
  localStorage.setItem('role', data.user.role);
  return data;
}

// Sign up
export const Register = async (name, email, password) =>{
  const response = await fetch(`http://localhost:3000/api/users`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({name, email, password}),
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