import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './admin/components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./admin/containers/Layout'))
const Login = lazy(() => import('./admin/pages/Login'))
const CreateAccount = lazy(() => import('./admin/pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./admin/pages/ForgotPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/admin" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  )
}

export default App
