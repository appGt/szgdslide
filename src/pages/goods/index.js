import React from 'react'
import { Card, Table, message, Modal, Button, Form } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '../../axios'
import FilterForm from './../../components/FilterForm'
import Utils from '../../utils/utils'
import Goods1 from './index1'
import Axios from 'axios';
import './goods.less'

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

  formList = [
    {
      type: 'INPUT',
      label: '商品名称',
      field: 'title',
      placeholder: '按名称查询',
      width: 250,
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '供应商',
      field: 'supplier',
      placeholder: '供应商',
      width: 250,
      list: this.state.supplierList
    },
  ]

  componentWillMount() {
    this.requestList();
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, 'http://127.0.0.1:7300/mock/5c876e66150c56207006bd22/slide/szgdslide/admin/listGoods', {
      params: _this.params,
      isShowLoading: true
    })
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
  handleCancel = () => this.setState({ imgVisible: false, editVisible: false })

  //编辑商品
  handleDetail = () => {
    this.setState({
      editVisable: true
    })
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width: 100,
      },
      {
        title: '商品图',
        dataIndex: 'img',
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
      },
      {
        title: '时间',
        dataIndex: 'time',
        render: (time) => {
          return Utils.formateDate(time)
        }
      },
      {
        title: '销量',
        dataIndex: 'sale_num',
        width: 100,
      },
      {
        title: '库存',
        dataIndex: 'stock_num',
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
          <FilterForm formList={this.formList} filterSubmit={this.handleFilter} handleReset={this.handleReset} />
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
        <Modal visible={this.state.editVisible} footer={null} onCancel={this.handleCancel}>
          <Goods1 />
        </Modal>
      </div>
    );
  }
}