import React from 'react'
import { Switch, HashRouter, Route } from 'react-router-dom'
import App from './App'
import AdminLogin from './pages/adminLogin'
import AdminLayout from './adminLayout'
import Welcome from './pages/home'
import News from './pages/news'
import EditNews from './pages/news/editNews'
import Video from './pages/video'
import Order from './pages/order'
import Goods from './pages/goods'
import Adv from './pages/adv'
import BBS from './pages/bbs'
import User from './pages/user'
import NoMatch from './pages/noMatch'

import Web from './pages/cWeb/web/web'
import WebNews from './pages/cWeb/news/news'
import WebVideo from './pages/cWeb/video/video'
import WebShop from './pages/cWeb/shop/shop'
import WebBBS from './pages/cWeb/bbs/bbs'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/adminLogin" component={AdminLogin}></Route>
            <Route path="/web" render={() =>
              <Switch>
                <Route path="/web" exact component={Web} />
                <Route path="/web/news" exact component={WebNews} />
                <Route path="/web/video" exact component={WebVideo} />
                <Route path="/web/shop" exact component={WebShop} />
                <Route path="/web/bbs" exact component={WebBBS} />
              </Switch>

            }></Route>
            <Route path="/" render={() =>
              <AdminLayout>
                <Switch>
                  <Route path="/" exact component={Welcome} />
                  <Route path="/home" exact component={Welcome} />
                  <Route path="/news/list" component={News} />
                  <Route path="/news/edit/:id" component={EditNews} />
                  <Route path="/news/edit/" component={EditNews} />
                  <Route path="/adv" component={Adv} />
                  <Route path="/order" component={Order} />
                  <Route path="/video" component={Video} />
                  <Route path="/goods" component={Goods} />
                  <Route path="/bbs" component={BBS} />
                  <Route path="/user" component={User} />
                  <Route component={NoMatch} />
                </Switch>
              </AdminLayout>

            }></Route>
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}