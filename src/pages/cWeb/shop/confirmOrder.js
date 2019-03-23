import React from 'react'
import { Button, Layout, Steps } from 'antd'
import CommonHeader from './../components/CommonHeader'
import './confirmOrder.less'
const Step = Steps.Step

export default class ConfirmOrder extends React.Component {
  state = {
    id: ''
  }
  componentWillMount() {
    let goodsList = localStorage.getItem('goodsList')
  }
  render() {
    return (
      <Layout style={{ background: '#fff' }}>
        <CommonHeader />
        <div className="common-container">
          <Steps current={1}>
            <Step title="立即购买" description="立即购买" />
            <Step title="确认订单" description="确认订单" />
            <Step title="完成" description="完成" />
          </Steps>,
        </div>
      </Layout>
    )
  }
}