import React from 'react'
import { Card, Table, message, Modal, Button, Form, DatePicker, Input, Select } from 'antd'
import OrderDetail from './orderDetail'
import { withRouter } from 'react-router-dom'
import axios from '../../axios'
import Utils from '../../utils/utils'
const FormItem = Form.Item

class Order extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisable: false,
    orderId: ''
  }
  params = {
    pageNo: 1,
    pageSize: 10
  }
  formList = [
    {
      type: 'INPUT',
      label: '标题',
      field: 'title',
      placeholder: '按标题查询',
      width: 250,
    },
    {
      type: '时间查询'
    }
  ]
  componentDidMount() {
    this.requestList()
  }

  //过滤
  handleFilter = (params) => {
    params.pageNo = this.params.pageNo
    params.pageSize = this.params.pageSize
    this.params = params
    if (this.params.start_time) {
      this.params.start_time = new Date(this.params.start_time).getTime()
    }
    if (this.params.end_time) {
      this.params.end_time = new Date(this.params.end_time).getTime()
    }
    this.requestList()
  }

  //重置过滤条件
  handleReset = () => {
    this.params = Object.assign(this.params, { name: '', startTime: '', endTime: '' })
  }

  handleDetail = (record, e) => {
    this.setState({
      visible: true,
      orderId: record.id
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
      orderId: ''
    })
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/szgdslide/admin/listOrders', {
      params: _this.params,
      isShowLoading: true
    })
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '商品',
        dataIndex: 'good',
        key: 'good',
        render: (good) => {
          return (<span>
            {
              good ? <span><img src={good.path} alt="good" style={{ width: 40, height: 40 }} />
                <span>{good.name}</span></span> : '商品已下架'
            }
          </span>)
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
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (time) => {
          return Utils.formateDate(time)
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (state, record) => {
          return getOrderState(state)
        }
      },
      {
        title: '操作',
        key: 'x',
        render: (text, record) => {
          return <a href="javascript:;" onClick={(e) => this.handleDetail(record, e)}>查看详情</a>
        }
      }
    ]
    const { visible, orderId } = this.state
    return (
      <div>
        <Card>
          <FilterForm filterSubmit={this.handleFilter} handleReset={this.handleReset} />
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="订单详情"
          visible={visible}
          onCancel={this.onCancel}
          footer={false}
        >
          {
            visible ? <OrderDetail id={orderId} /> : ''
          }
        </Modal>
      </div>
    )
  }
}

const FilterForm = Form.create({})(
  class FilterForm extends React.Component {
    query = () => {
      const params = this.props.form.getFieldsValue()
      params.name = params.name || ''
      this.props.filterSubmit(params)
    }

    reset = () => {
      this.props.form.resetFields()
      this.props.handleReset()
    }

    delete = () => {
      this.props.handleDelete()
    }
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <Form layout="inline">
          <FormItem label="商品名称" key="name">
            {
              getFieldDecorator('name')(
                <Input placeholder="商品名称" style={{ width: 150 }} />
              )
            }
          </FormItem>
          <FormItem label="时间范围">
            {
              getFieldDecorator('startTime')(
                <DatePicker showTime={true} disabledHours format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </FormItem>
          <FormItem label="~">
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime={true} disabledHours format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </FormItem>
          <FormItem label="供应商" key="supplier">
            {
              getFieldDecorator('supplier')(
                <Select placeholder="供应商" style={{ width: 150 }} >
                  {
                    this.props.supplierList
                  }
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            <Button onClick={this.query} type="primary" style={{ marginRight: 10 }}>查询</Button>
            <Button onClick={this.reset} type="default" style={{ marginRight: 10 }}>重置</Button>
          </FormItem>
        </Form>
      )
    }
  }
)

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
export default withRouter(Order)
