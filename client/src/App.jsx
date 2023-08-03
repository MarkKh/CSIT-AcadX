import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './admin/components/AccessibleNavigationAnnouncer';
import AuthChecker from '../src/admin/components/AuthChecker';
import ProtectedPage from '../src/admin/pages/ProtectedPage';

const Layout = lazy(() => import('./admin/containers/Layout'));
const Login = lazy(() => import('./admin/pages/Login'));
const CreateAccount = lazy(() => import('./admin/pages/CreateAccount'));
const ForgotPassword = lazy(() => import('./admin/pages/ForgotPassword'));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Redirect exact from="/" to="/login" />

          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <AuthChecker>
            <Route path="/admin" component={Layout} />
          </AuthChecker>

          {/* Place new routes over this */}
          {/* If you have an index page, you can remove this Redirect */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
