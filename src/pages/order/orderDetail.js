import React from 'react'
import { Button, Row, Col, Message } from 'antd'
import Axios from 'axios';


export default class OrderDetail extends React.Component {
  state = {
    order: {
      good: { supplier: {} },
      user: {}
    },
    id: ''
  }
  componentWillMount() {
    let id = this.props.id
    this.setState({
      id
    })
    this.getOrder(id)
  }

  getOrderState = (type) => {
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

  getOrder = (id) => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailOrder',
      data: { id: id },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          order: res.data.data
        })
      }
    }).catch(() => {
      Message.error('获取数据失败')
    })
  }

  onFinish = () => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/updateOrder',
      data: { id: this.state.id, state: 2 },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.getOrder(this.state.id)
      }
    }).catch(() => {
      Message.error('提交失败')
    })
  }
  onDelete = () => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/deteleOrder',
      data: { ids: this.state.id },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        Message.success('取消成功')
        this.props.history.push('/shop')
      }
    }).catch(() => {
      Message.error('取消失败')
    })
  }

  render() {
    const order = this.state.order
    return (
      <div>
        <div className="order-wrapper">
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>订单编号</Col>
            <Col span={4}>{order.id}</Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>商品</Col>
            <Col span={4}>
              {
                <span>
                  <img src={order.good.path} alt="good" style={{ width: 50, height: 50 }} />
                  <span>{order.good.name}</span>
                </span>
              }
            </Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>数量</Col>
            <Col span={4}>{order.num}</Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>地址</Col>
            <Col span={4}>{order.address}</Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>供应商</Col>
            <Col span={4}>{order.good.supplier.name}</Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>价格</Col>
            <Col span={4} style={{ color: 'red', fontSize: 20 }}>￥{order.money}</Col>
          </Row>
          <Row style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={4} className="label" style={{ borderRight: '1px solid #e1e2e3', padding: '0 10px' }}>状态</Col>
            <Col span={4}>
              {
                this.getOrderState(order.state)
              }
            </Col>
          </Row>
        </div>
        {
          order.state === 0 || order.state === 1 ? (<div><Button type="primary" onClick={this.onFinish} style={{ marginRight: 50 }}>已完成</Button></div>) : ''}
      </div>
    )
  }
}

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