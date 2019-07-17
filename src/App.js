import React from 'react'
import {useAuth0} from './react-auth0-wrapper'
import Site from './Site'


const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && (<div>
                <button onClick={() => logout()}>Log out</button>
                <Site/>
                </div>)}


    </div>
  );
};

export default App;
