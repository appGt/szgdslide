import React from 'react'
import { Button, Layout, InputNumber, Message, Modal, Table } from 'antd'
import { withRouter, NavLink } from 'react-router-dom'
import CommonHeader from './../components/CommonHeader'
import UserLogin from './../components/UserLogin'
import UserInfo from './../components/UserInfo'
import './goodsDetail.less'
import Axios from 'axios';

class GoodsDetail extends React.Component {
  state = {
    num: 1,
    goods: { supplier: {} },
    isLogin: false,
    visible: false,
    orderList: [],
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
    if (!this.state.isLogin) {
      Message.error('请先登录')
      return
    }
    let data = {}
    data.goods = this.state.goods
    data.num = this.state.num
    localStorage.setItem('goodsList', JSON.stringify(data))
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
          localStorage.setItem('userData', JSON.stringify(res.data.data))
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
        localStorage.removeItem('userData')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  showOrder = () => {
    let _this = this
    Axios({
      url: '/szgdslide/admin/ordersForUser',
      method: 'post',
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        let list = res.data.data
        list = list.map((item, i) => {
          return {
            key: item.id,
            id: item.id,
            good: item.good,
            num: item.num,
            money: item.money,
            state: item.state
          }
        })
        _this.setState({
          visible: true,
          orderList: list
        })
      }
    })

  }

  onClose = () => {
    this.setState({
      visible: false
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
              this.state.isLogin ? <UserInfo shop={true} userData={this.state.userData} logout={this.logout} showOrder={this.showOrder} /> : <UserLogin handleLogin={this.handleLogin} />
            }
          </div>
        </div>
        <Modal visible={this.state.visible} onCancel={this.onClose} width={800} footer={false}>
          <ListOrder dataSource={this.state.orderList} />
        </Modal>
      </Layout>
    )
  }
}

function ListOrder(props) {
  const dataSource = props.dataSource
  const getOrderState = (type) => {
    switch (type) {
      case 0:
        return <span style={{ color: 'red', fontSize: 20 }}>未付款</span>
      case 1:
        return <span style={{ color: '#37b753', fontSize: 20 }}>已付款</span>
      case 2:
        return <span style={{ color: '#37b753', fontSize: 20 }}>已完成</span>
      case 3:
        return <span style={{ color: '#ccc', fontSize: 20 }}>商品已下架</span>
    }
  }
  const columns = [
    {
      title: '编号',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: '商品',
      key: 'good',
      dataIndex: 'good',
      render: (txt, item) => {
        return <span>
          <img src={txt.path} alt="good" style={{ width: 40, marginRight: 20 }} />
          {
            txt.name
          }
        </span>
      }
    },
    {
      title: '数量',
      key: 'num',
      dataIndex: 'num'
    },
    {
      title: '金额',
      key: 'money',
      dataIndex: 'money'
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: (txt, type) => {
        return getOrderState(type.state)
      }
    },
    {
      title: '操作',
      key: 'handle',
      render: (x, item) => {
        return <NavLink to={"/order/orderDetail/" + item.id}>查看</NavLink>
      }
    }
  ]
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default withRouter(GoodsDetail)