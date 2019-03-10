import React from 'react'
import { Switch, HashRouter, Route } from 'react-router-dom'
import App from './App'
import AdminLogin from './pages/adminLogin'
import AdminLayout from './adminLayout'
import Welcome from './pages/home'
import News from './pages/news'
import Video from './pages/video'
import Order from './pages/order'
import Goods from './pages/goods'
import Adv from './pages/adv'
import BBS from './pages/bbs'
import User from './pages/user'
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
                  <Route path="/news" component={News} />
                  <Route path="/adv" component={News} />
                  <Route path="/order" component={Order} />
                  <Route path="/video" component={Video} />
                  <Route path="/goods" component={Goods} />
                  <Route path="/bbs" component={BBS} />
                  <Route path="/user" component={User} />
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