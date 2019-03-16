import React from 'react'
import { Card, Table, message, Modal, Button, Form, Input, Select } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '../../axios'
import Utils from '../../utils/utils'
import EditGood from './editGood'
import Goods1 from './index1'
import Axios from 'axios'
import './goods.less'
const FormItem = Form.Item
const Option = Select.Option

export default class goods extends React.Component {

  state = {
    bigImg: '',
    imgVisible: false,
    supplierList: [],
    editVisable: false,
  }

  params = {
    page: 1,
    pageSize: 10
  }

  componentWillMount() {
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/szgdslide/admin/listGoods', {
      params: _this.params,
      isShowLoading: true
    })
    Axios({
      url: '/szgdslide/admin/listSuppliers',
      data: { page: 1, pageSize: 50 },
      method: 'get'
    }).then((res) => {
      if (res.status === 200) {
        let data = res.data
        let list = data.data.result
        let supplierList = list.map((option) => {
          return <Option value={option.id} key={option.id}>{option.name}</Option>
        })
        this.setState({
          supplierList
        })
      }
      console.log(res)
    }).catch(() => {
      message.error('获取供应商信息失败')
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
  handleCancel = () => this.setState({ imgVisible: false, editVisiable: false, goodsId: '' })

  //编辑商品
  handleDetail = (record) => {
    this.setState({
      editVisiable: true,
      goodsId: record.id
    })
  }

  //创建商品
  newGood = (record) => {
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
        title: '商品图',
        dataIndex: 'path',
        width: 100,
        render: (img) => {
          return (
            <img src={img} className="goods-img" onClick={(e) => this.imgClick(img, e)} />
          )
        }
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width: 100,
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 100,
      },
      {
        title: '供应商',
        dataIndex: 'supplier',
        width: 100,
        render: (supplier) => {
          return supplier.name
        }
      },
      {
        title: '销量',
        dataIndex: 'saleNum',
        width: 100,
      },
      {
        title: '库存',
        dataIndex: 'stockNum',
        width: 100,
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
          <Button type="primary" onClick={this.newGood}>添加新商品</Button>
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
            scroll={{ y: 500 }}
          />
        </div>
        <Modal visible={this.state.imgVisible} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={this.state.bigImg} />
        </Modal>
        <Modal visible={this.state.editVisiable} footer={null} onCancel={this.handleCancel}>
          {this.state.editVisiable ? <EditGood goodsId={this.state.goodsId} supplierList={this.state.supplierList} onCanelEdit={this.onCanelEdit} /> : ''}
          {/* <Goods1 /> */}
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
            <Button onClick={this.reset} type="danger">删除</Button>
          </FormItem>
        </Form>
      )
    }
  }
)