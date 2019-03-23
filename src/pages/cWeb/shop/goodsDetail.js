import React from 'react'
import { Button, Layout, InputNumber, Message } from 'antd'
import { withRouter } from 'react-router-dom'
import CommonHeader from './../components/CommonHeader'
import UserLogin from './../components/UserLogin'
import UserInfo from './../components/UserInfo'
import './goodsDetail.less'
import Axios from 'axios';

class GoodsDetail extends React.Component {
  state = {
    num: 1,
    goods: { supplier: {} },
    isLogin: false
  }
  componentWillMount() {
    let id = this.props.match.params.id
    if (!id) {
      window.history.go(-1)
    }
    this.isLogined()
    this.getGoods(id)
  }

  onBuy = () => {
    if(!this.state.isLogin){
      Message.error('请先登录')
      return
    }
    let { goods, num } = this.state
    localStorage.setItem('goodsList', { goods, num })
    this.props.history.push('/order/confirmOrder')
  }

  onNumber = (num) => {
    this.setState({
      num: num
    })
  }

  getGoods = (id) => {
    let _this = this
    Axios({
      url: '/szgdslide/admin/detailGood',
      method: 'post',
      data: {
        id: id
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        _this.setState({
          goods: res.data.data
        })
      } else {
        Message.error('获取数据失败')
      }
    })
  }

  isLogined = () => {
    let _this = this
    let isLogin = localStorage.getItem('userLogin')
    if (isLogin === 'true') {
      Axios({
        method: 'get',
        url: '/szgdslide/admin/isLogined',
        params: { front: true },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.status === 200 && res.data.success) {
          _this.setState({
            isLogin: isLogin === 'true',
            userData: res.data.data
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  logout = () => {
    Axios({
      method: 'get',
      url: '/szgdslide/admin/logout',
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          isLogin: false,
          userData: {}
        })
        localStorage.removeItem('userLogin')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //登录成功
  handleLogin = (userData) => {
    this.setState({
      isLogin: true,
      userData: userData
    })
  }

  render() {
    return (
      <Layout style={{ background: '#fff' }}>
        <CommonHeader />
        <div className="goods-content">
          <div className="goods-detailimg">
            <img src={this.state.goods.path || "http://dummyimage.com/378x378"} alt="good" />
          </div>
          <div className="goods-info">
            <p className="goods-name">
              {this.state.goods.name}
            </p>
            <div className="info-item goods-price">
              <span className="info-label">销售价</span>
              <span className="price-num">￥{this.state.goods.price}</span>
            </div>
            <div className="info-item">
              <span className="info-label">供应商</span>
              <span className="price-num">{this.state.goods.supplier.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">累计销量</span>
              <span className="price-num">{this.state.goods.saleNum}</span>
            </div>
            <div className="info-item">
              <span className="info-label">数量</span>
              <InputNumber
                defaultValue={1}
                min={1}
                max={5}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.onNumber}
              />
              <span style={{ marginLeft: 20 }}>库存 {this.state.goods.stockNum}件</span>
            </div>
            <div className="info-item" style={{ marginTop: 20 }}>
              <span className="info-label">
                <Button size="large" type="primary" onClick={this.onBuy}>立即购买</Button>
              </span>
            </div>
          </div>
          <div className="person-info">
            {
              this.state.isLogin ? <UserInfo shop={true} userData={this.state.userData} logout={this.logout} /> : <UserLogin handleLogin={this.handleLogin} />
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(GoodsDetail)