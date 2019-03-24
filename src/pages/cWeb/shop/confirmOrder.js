import React from 'react'
import { Button, Layout, Steps, Form, Input, Table, Message } from 'antd'
import { withRouter } from 'react-router-dom'
import CommonHeader from './../components/CommonHeader'
import Axios from 'axios';
const Step = Steps.Step
const FormItem = Form.Item

class ConfirmOrder extends React.Component {
  state = {
    id: '',
    address: '',
    phone: '',
    dataSource: []
  }
  componentWillMount() {
    let goodsList = JSON.parse(localStorage.getItem('goodsList'))
    let userData = JSON.parse(localStorage.getItem('userData'))
    let dataSource = []
    dataSource.push({
      ...goodsList,
      key: 1
    })
    this.setState({
      goodsList,
      userData,
      dataSource
    })
  }

  componentWillUnmount() {
    localStorage.removeItem('goodsList')
  }
  onChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }
  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  onCreateOrder = () => {
    if (!this.state.address || !this.state.phone) {
      Message.error('请填写地址和电话号码')
      return
    }

    let data = {}
    data.goodId = this.state.goodsList.goods.id
    data.num = this.state.goodsList.num
    data.address = this.state.address
    data.phone = this.state.phone

    Axios({
      method: 'post',
      url: '/szgdslide/admin/addOrder',
      data: data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.props.history.push('/order/orderDetail/' + res.data.data.id)
      }
    }).catch(() => {
      Message.error('提交失败')
    })
  }

  render() {
    const columns = [
      {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        render: (txt, record) => {
          return (
            <span>
              <img src={record.goods.path} alt="good" style={{ width: 40 }} />
              <span>{record.goods.name}</span>
            </span>
          )
        }
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num'
      },
      {
        title: '单价',
        dataIndex: 'saleNum',
        key: 'saleNum',
        render: (txt, record) => {
          return <span style={{ fontSize: 16, color: '#f00' }}>{record.num * record.goods.saleNum}</span>
        }
      },
      {
        title: '总价',
        dataIndex: 'money',
        key: 'money',
        render: (txt, record) => {
          return <span style={{ fontSize: 16, color: '#f00' }}>{record.num * record.goods.saleNum}</span>
        }
      },
    ]
    return (
      <Layout style={{ background: '#fff' }}>
        <CommonHeader />
        <div className="common-container">
          <Steps current={1}>
            <Step title="立即购买" description="立即购买" />
            <Step title="确认订单" description="确认订单" />
            <Step title="完成" description="完成" />
          </Steps>
          <Form>
            <FormItem label="地址">
              <Input placeholder="请输入地址" onChange={this.onChange} />
            </FormItem>
            <FormItem label="联系方式">
              <Input placeholder="请输入联系方式" onChange={this.onPhoneChange} />
            </FormItem>
          </Form>
          <Table dataSource={this.state.dataSource} columns={columns} />
          <div>
            <Button type="primary" className="fr" onClick={this.onCreateOrder}>
              提交订单
          </Button>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(ConfirmOrder)