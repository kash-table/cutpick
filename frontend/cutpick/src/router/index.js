import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import DesignerRoutes from './DesignerRoutes';

const Router = () => {
  
  return (
    <BrowserRouter
      basename="/"
    >
      <Switch>
        <Route path="/designer" component={DesignerRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path="/" component={MainRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;