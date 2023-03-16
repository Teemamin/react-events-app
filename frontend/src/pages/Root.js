import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData()
  const submit = useSubmit()

  useEffect(() => {
    if(!token){
      //if there no token, no need to run the effect
      return
    }

    if(token === 'Expired'){
      //if it has exp, logout the user
      return submit(null,{action: '/logout', method:'post'})
    }

    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)
    const clearToken = setTimeout(()=>{
      submit(null,{action: '/logout', method:'post'})
      // localStorage.removeItem('token')
    },tokenDuration)
  
    return () => {
      clearTimeout(clearToken)
    }
  }, [token,submit])
  

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
