import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
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
import GoodsDetail from './pages/cWeb/shop/goodsDetail'
import ConfirmOrder from './pages/cWeb/shop/confirmOrder'
import OrderDetail from './pages/cWeb/shop/orderDetail'
import WebBBS from './pages/cWeb/bbs/bbs'
import Detail from './pages/cWeb/detail/detail'
import Register from './pages/cWeb/register/register'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/adminLogin" exact component={AdminLogin}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/admin" render={() =>
              <AdminLayout>
                <Switch>
                  <Route path="/admin" exact component={Welcome} />
                  <Route path="/admin/home" component={Welcome} />
                  <Route path="/admin/news/list"  component={News} />
                  <Route path="/admin/news/edit/:id"  component={EditNews} />
                  <Route path="/admin/news/edit"  component={EditNews} />
                  <Route path="/admin/adv"  component={Adv} />
                  <Route path="/admin/order"  component={Order} />
                  <Route path="/admin/video"  component={Video} />
                  <Route path="/admin/goods"  component={Goods} />
                  <Route path="/admin/bbs"  component={BBS} />
                  <Route path="/admin/user"  component={User} />
                  <Route component={NoMatch} />
                </Switch>
              </AdminLayout>

            }></Route>
            <Route path="/" render={() =>
              <Switch>
                <Route path="/" exact component={Web} />
                <Route path="/news" exact component={WebNews} />
                <Route path="/video" exact component={WebVideo} />
                <Route path="/shop/:id" exact component={GoodsDetail} />
                <Route path="/order/confirmOrder" exact component={ConfirmOrder} />
                <Route path="/order/orderDetail/:id" exact component={OrderDetail} />
                <Route path="/shop" exact component={WebShop} />
                <Route path="/bbs" exact component={WebBBS} />
                <Route path="/bbs/:id" exact component={WebBBS} />
                <Route path="/:type/:id" exact component={Detail} />
              </Switch>

            }></Route>
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}