import React from 'react'
import { Button, Layout, Steps, Form, Row, Col, Message } from 'antd'
import { withRouter } from 'react-router-dom'
import CommonHeader from './../components/CommonHeader'
import './order.less'
import Axios from 'axios';
const Step = Steps.Step
const FormItem = Form.Item

export default class OrderDetail extends React.Component {
  state = {
    order: {
      good: { supplier: {} },
      user: {}
    },
    id: ''
  }
  componentWillMount() {
    let id = this.props.match.params.id
    if (!id) {
      window.history.go(-1)
    }
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
      Message.error('提交失败')
    })
  }

  onPay = () => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/updateOrder',
      data: { id: this.state.id, state: 1 },
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
      data: { ids: this.state.id},
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
      <Layout style={{ background: '#fff' }}>
        <CommonHeader />
        <div className="common-container">
          <div className="order-wrapper">
            <Row>
              <Col span={12} className="label">订单编号</Col>
              <Col span={12}>{order.id}</Col>
            </Row>
            <Row>
              <Col span={12} className="label">商品</Col>
              <Col span={12}>
                {
                  <span>
                    <img src={order.good.path} alt="good" />
                    <span>{order.good.name}</span>
                  </span>
                }
              </Col>
            </Row>
            <Row>
              <Col span={12} className="label">数量</Col>
              <Col span={12}>{order.num}</Col>
            </Row>
            <Row>
              <Col span={12} className="label">地址</Col>
              <Col span={12}>{order.address}</Col>
            </Row>
            <Row>
              <Col span={12} className="label">供应商</Col>
              <Col span={12}>{order.good.supplier.name}</Col>
            </Row>
            <Row>
              <Col span={12} className="label">价格</Col>
              <Col span={12} style={{ color: 'red', fontSize: 20 }}>￥{order.money}</Col>
            </Row>
            <Row>
              <Col span={12} className="label">状态</Col>
              <Col span={12}>
                {
                  this.getOrderState(order.state)
                }
              </Col>
            </Row>
          </div>
          {
            order.state === 0 ? (<div><Button type="primary" onClick={this.onPay} style={{ marginRight: 50 }}>付款</Button> <Button type="danger" onClick={this.onDelete}>取消订单</Button></div>) : ''}
        </div>
      </Layout>
    )
  }
}