import React from 'react'
import { Card, Table, message, Modal, Button, Form } from 'antd'
import axios from '../../axios/index'
import FilterForm from './../../components/FilterForm'

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
      width: 150,
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '作者',
      field: 'author',
      placeholder: '按标题查询作者',
      initialValue: '1',
      width: 100,
      list: [{ id: '0', name: '小明' }, { id: '1', name: '小李' }, { id: '2', name: '小白' }]
    }
  ]
  componentDidMount() {
    // this.requestList()
  }

  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/order/list', {
      params: _this.params,
      isShowLoading: true
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
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
        title: '发布时间',
        dataIndex: 'createTime'
      },
      {
        title: '点击量',
        dataIndex: 'click'
      }
    ]
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card>
          <FilterForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}
