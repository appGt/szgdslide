import React from 'react'
import { Card, Table, message } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '../../axios'
import FilterForm from './../../components/FilterForm'
import Utils from '../../utils/utils'
import Axios from 'axios';

class News extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisable: false
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
    this.params.start_time = new Date(this.params.start_time).getTime()  || ''
    this.params.end_time = new Date(this.params.end_time).getTime() || ''
    this.requestList()
  }

  //重置过滤条件
  handleReset = () => {
    this.params = Object.assign(this.params, { title: '', start_time: '', end_time: '' })
  }

  //删除
  handleDelete = () => {
    let selectedRows = this.state.selectedRows
    let ids = ''
    selectedRows.forEach((item, index) => {
      ids += (item.id + ',')
    })
    console.log(ids)
    Axios({
      method: 'get',
      url: '/szgdslide/admin/deteleNew',
      params: { ids },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        message.success('删除成功')
        this.requestList()
        this.setState({ selectedRowKeys:[], selectedRows:[] })
      } else {
        message.error('删除失败')
      }
    }).catch(() => { message.error('删除失败') })
  }

  handleDetail = (record, e) => {
    let id = record.id
    this.props.history.push('/admin/news/edit/' + id)
  }

  requestList = () => {
    let _this = this
    axios.requestList(_this, '/szgdslide/admin/listNews', {
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
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
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
        title: '点击量',
        key: 'browes',
        dataIndex: 'browes',
        render: (browes) => {
          return browes || 0
        }
      },
      {
        title: '操作',
        key: 'x',
        render: (text, record) => {
          return <a href="javascript:;" onClick={(e) => this.handleDetail(record, e)}>编辑</a>
        }
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
          <FilterForm formList={this.formList} filterSubmit={this.handleFilter} handleReset={this.handleReset} handleDelete={this.handleDelete} />
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
export default withRouter(News)
