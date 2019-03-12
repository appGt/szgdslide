import React from 'react'
import { Card, Table, message, Modal, Button, Form } from 'antd'
import axios from '../../axios'
import FilterForm from './../../components/FilterForm'
import Utils from '../../utils/utils'

export default class News extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisable: false
  }
  params = {
    page: 1,
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
    this.params = Object.assign(this.params, params)
    if (this.params.startTime) {
      this.params.startTime = new Date(this.params.startTime).getTime()
    }
    if (this.params.endTime) {
      this.params.endTime = new Date(this.params.endTime).getTime()
    }
    this.requestList()
  }

  //重置过滤条件
  handleReset = () => {
    this.params = Object.assign(this.params, { title: '', startTime: '', endTime: '' })
  }

  //删除
  handleDelete = () => {
    let selectedRows = this.state.selectedRows
    let ids = ''
    selectedRows.forEach((i, item) => {
      ids += (item.id + ',')
    })
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, 'http://localhost:7300/mock/5c876e66150c56207006bd22/slide/admin/listNews', {
      params: _this.params,
      isShowLoading: true
    })
  }

  //选中
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id'
      },
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '时间',
        dataIndex: 'time',
        render: (time) => {
          return Utils.formateDate(time)
        }
      },
      {
        title: '点击量',
        dataIndex: 'browes'
      },
      {
        title: '操作'
      }
    ]
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
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
          />
        </div>
      </div>
    )
  }
}
