import React from 'react'
import { Switch, HashRouter, Route } from 'react-router-dom'
import App from './App'
import AdminLogin from './pages/adminLogin'
import AdminLayout from './adminLayout'
import Welcome from './pages/home'
import NoMatch from './pages/noMatch'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/adminLogin" component={AdminLogin}></Route>
            <Route path="/" render={() =>
              <AdminLayout>
                <Switch>
                  <Route path="/" exact component={Welcome} />
                  <Route path="/home" exact component={Welcome} />
                  <Route component={NoMatch} />
                </Switch>
              </AdminLayout>

            }></Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}