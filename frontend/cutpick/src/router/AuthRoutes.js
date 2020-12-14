import React from 'react';
import { Route } from 'react-router-dom';
import Auth from '../pages/auth/'
import LoginWrapper from '../pages/auth/LoginWrapper'
import {Login, Logout} from '../pages/auth/'
const AuthRoutes = ({ history, match }) => {
//   const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
//   if (isLoggedIn) {
//     history.push('/');
//   }

  return (
    <LoginWrapper>
        <Route
            exact
            path={`${match.path}/`}
            component={Auth}
        />
        <Route
            exact
            path={`${match.path}/login`}
            component={Login}
        />
        <Route
            exact
            path={`${match.path}/logout`}
            component={Logout}
        />
    </LoginWrapper>
  );
};

export default AuthRoutes;