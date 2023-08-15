import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './admin/components/AccessibleNavigationAnnouncer';
import AuthChecker from '../src/admin/components/AuthChecker';

const Layout = lazy(() => import('./admin/containers/Layout'));
const Login = lazy(() => import('./admin/pages/Login'));

function App() {
  return (
    <>
      <Router>          
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Redirect exact from="/" to="/login" />

          <Route path="/login" component={Login} />
          
          <AuthChecker>
            <Route path="/admin" component={Layout} />
          </AuthChecker>

        </Switch>
      </Router>
    </>
  );
}

export default App;
