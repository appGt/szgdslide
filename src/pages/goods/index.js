import React from 'react'
import { Card, Table, Message, Modal, Button, Form, Input, Select } from 'antd'
import axios from '../../axios'
import EditGood from './editGood'
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
    pageNo: 1,
    pageSize: 10
  }

  componentWillMount() {
    this.requestList()
    this.requestSupplierList()
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/szgdslide/admin/listGoods', {
      params: _this.params,
      isShowLoading: true
    })
  }

  requestSupplierList = () => {
    Axios({
      url: '/szgdslide/admin/listSuppliers',
      data: { pageNo: 1, pageSize: 50 },
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
      Message.error('获取供应商信息失败')
    })
  }

  handleFilter = (params) => {
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
  handleCancel = () => this.setState({ imgVisible: false, editVisiable: false, goodsId: '', supplierVisible: false })

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

  newSupplier = () => {
    this.setState({
      supplierVisible: true
    })
  }

  onSuc=()=>{
    this.requestList()
    this.handleCancel()
  }

  onSupplierSuc = () => {
    this.requestSupplierList()
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
          <Button type="primary" onClick={this.newSupplier} style={{ marginLeft: 20 }}>添加供应商</Button>
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
          {this.state.editVisiable ? <EditGood goodsId={this.state.goodsId} onSuc={this.onSuc} supplierList={this.state.supplierList} onCanelEdit={this.handleCancel} /> : ''}
        </Modal>
        <Modal visible={this.state.supplierVisible} footer={null} onCancel={this.handleCancel}>
          <SupplierForm onSuc={this.onSupplierSuc} />
        </Modal>
      </div>
    );
  }
}

const FilterForm = Form.create({})(
  class FilterForm extends React.Component {
    query = () => {
      const params = this.props.form.getFieldsValue()
      params.name = params.name || ''
      params.supplierId = params.supplierId || ''
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
          <FormItem label="供应商" key="supplierId">
            {
              getFieldDecorator('supplierId')(
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

const SupplierForm = Form.create({})(
  class supplierForm extends React.Component {
    onSubmit = () => {
      this.props.form.validateFields((err, value) => {
        if (!err) {
          Axios({
            method: 'post',
            url: '/szgdslide/admin/addSupplier',
            data: value,
            transformRequest: [function (data) {
              // 将数据转换为表单数据
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res) => {
            if (res.status === 200 && res.data.success) {
              Message.success('提交成功')
              this.props.form.setFieldsValue({ name: '', address: '', phone: '' })
              this.props.onSuc()
            }
          }).catch(() => { Message.error('提交失败') })
        }
      })
    }
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <div>
          <Form onSubmit={this.onSubmit}>
            <FormItem label="供应商名称">
              {
                getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '输入供应商名称'
                  }]
                })(
                  <Input placeholder="供应商名称" />
                )
              }
            </FormItem>
            <FormItem label="供应商地址">
              {
                getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    message: '输入供应商地址'
                  }]
                })(
                  <Input placeholder="供应商地址" />
                )
              }
            </FormItem>
            <FormItem label="联系号码">
              {
                getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    message: '请输入联系号码'
                  }, {
                    pattern: /^1[3458]\d{9}$/,
                    message: '请输入正确手机号'
                  }]
                })(
                  <Input placeholder="联系号码" />
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>
        </div>
      )
    }
  }
)