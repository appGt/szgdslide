import React from 'react'
import { Card, Table, message, Modal, Button, Form, Input, Select } from 'antd'
import axios from '../../axios'
import EditAdv from './editAdv'
import Axios from 'axios'
const FormItem = Form.Item
const Option = Select.Option

export default class Adv extends React.Component {

  state = {
    bigImg: '',
    imgVisible: false,
    supplierList: [],
    editVisable: false,
    adverId: ''
  }

  params = {
    pageNo: 1,
    pageSize: 10
  }

  componentWillMount() {
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/szgdslide/admin/listAdvers', {
      params: _this.params,
      isShowLoading: true
    })

  }

  handleFilter = (params)=>{
    this.params = Object.assign(this.params, params)
    this.requestList()
  }

  //选中
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  //点击图片
  imgClick = (img, e) => {
    this.setState({
      bigImg: img,
      imgVisible: true
    })
  }
  //取消预览
  handleCancel = () => this.setState({ imgVisible: false, editVisiable: false, adverId: '' })

  //编辑
  handleDetail = (record) => {
    this.setState({
      editVisiable: true,
      adverId: record.id
    })
  }

  //创建
  newAdv = () => {
    this.setState({
      editVisiable: true
    })
  }

  onCanelEdit = () => {
    this.handleCancel()
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '广告图',
        dataIndex: 'path',
        width: 100,
        render: (img) => {
          return (
            <img src={img} className="goods-img" onClick={(e) => this.imgClick(img, e)} />
          )
        }
      },
      {
        title: '描述',
        dataIndex: 'nrcontent',
      },
      {
        title: '操作',
        width: 100,
        key: 'x',
        render: (text, record) => {
          return <a href="javascript:;" onClick={(e) => this.handleDetail(record, e)}>编辑</a>
        }
      }
    ]

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div className="full-height">
        <Card>
          <Button type="primary" onClick={this.newAdv}>添加新广告</Button>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <FilterForm supplierList={this.state.supplierList} filterSubmit={this.handleFilter} handleReset={this.handleReset} />
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            scroll={{ y: 800 }}
          />
        </div>
        <Modal visible={this.state.imgVisible} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={this.state.bigImg} />
        </Modal>
        <Modal visible={this.state.editVisiable} footer={null} onCancel={this.handleCancel}>
          {this.state.editVisiable ? <EditAdv adverId={this.state.adverId} onCanelEdit={this.onCanelEdit} handleEditSuc={this.requestList} /> : ''}
        </Modal>
      </div>
    );
  }
}

const FilterForm = Form.create({})(
  class FilterForm extends React.Component {
    query = () => {
      const params = this.props.form.getFieldsValue()
      this.props.filterSubmit(params)
    }

    delete = () => {
      this.props.handleDelete()
    }
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <Form layout="inline">
          <FormItem label="标题" key="title">
            {
              getFieldDecorator('title')(
                <Input placeholder="标题" style={{ width: 150 }} />
              )
            }
          </FormItem>
          <FormItem>
            <Button onClick={this.query} type="primary" style={{ marginRight: 10 }}>查询</Button>
            {/* <Button onClick={this.reset} type="default" style={{ marginRight: 10 }}>重置</Button> */}
            <Button onClick={this.reset} type="danger">删除</Button>
          </FormItem>
        </Form>
      )
    }
  }
)