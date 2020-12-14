import React from 'react';
import { Route } from 'react-router-dom';
import Page from '../components/atoms/Page';
import Header from "../components/templates/Header"
import loadable from "@loadable/component"

const DesignerCreate = loadable(() => import("../pages/designer/DesignerCreate"));
const DesignerRead = loadable(() => import("../pages/designer/DesignerView"));
const DesignerUpdate = loadable(() => import("../pages/designer/DesignerUpdate"));
const DesignerDelete = loadable(() => import("../pages/designer/DesignerDelete"));

const DesignerRoutes = ({ history, match }) => {
//   const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
//   if (isLoggedIn) {
//     history.push('/');
//   }

  console.log(`${match.path}/create`);
  return (
    <Page>    
      <Header/>
      <Route exact path={`${match.path}/create`} component={DesignerCreate} />
      <Route exact path={`${match.path}/update/:id`} component={DesignerUpdate} />
      <Route exact path={`${match.path}/delete/:id`} component={DesignerDelete} />
      <Route path={`${match.path}/read/:id`} component={DesignerRead} />
    </Page>
  );
};

export default DesignerRoutes;