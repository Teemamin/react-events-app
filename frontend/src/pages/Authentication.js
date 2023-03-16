import AuthForm from '../components/AuthForm';
import {json, redirect} from 'react-router-dom'

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
//searchParams readonly property of the URL interface returns a URLSearchParams object allowing access to the GET decoded query arguments contained in the URL.

export const action = async ({request})=>{
  const data = await request.formData();
  const searchParam = new URL(request.url).searchParams
  const mode = searchParam.get('mode') || 'login' //get the mode param or default to login
  const userData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if(mode !== 'login' && mode !== 'signup'){
    throw json({ message: 'Unsupported Mode.' }, { status: 422 }) //incase a user enters a mode that is not sigup or login
  }

  const response = await fetch(`http://localhost:8080/${mode}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });


  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    //this will be handled in your custom error element / component
    throw json({ message: 'Could not authenticate.' }, { status: 500 });
  }
  const resData = await response.json()
  const token = resData.token
  localStorage.setItem('token', token)
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + 1) // set time in the future
  localStorage.setItem('exp', expiration.toISOString())
  // at this point is when we set the token, so it makes sense to set the exp date aswell
  //so we can track when to logout users

  return redirect('/')
}