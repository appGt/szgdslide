import React from 'react'
import { Card, Table, Modal, Button, Form, Input, message } from 'antd'
import axios from '../../axios'
import Utils from './../../utils/utils';
import BBSDetail from './bbsDetail';
import Axios from 'axios'
const FormItem = Form.Item

export default class BBS extends React.Component {

  state = {
    visible: false,
    sendId: ''
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
    axios.requestList(_this, '/szgdslide/admin/listSends', {
      params: _this.params,
      isShowLoading: true
    })

  }

  handleFilter = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
  }

  handleDelete = () => {
    let selectedRows = this.state.selectedRows
    let ids = []
    selectedRows.forEach((item, index) => {
      ids.push(item.id)
    })
    ids = ids.join(',')
    console.log(ids)
    Axios({
      method: 'get',
      url: '/szgdslide/admin/deteleSend',
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

  Detail = (record) => {
    this.setState({
      visible: true,
      sendId: record.id
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
      sendId: ''
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
        width: 70,
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '发帖人',
        dataIndex: 'user',
        width: 100,
        render: (text, record) => {
          return record.user.userdesc
        }
      },
      {
        title: '回复数',
        dataIndex: 'num',
        width: 70,
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        width: 200,
        key: 'time',
        render: (text, record) => {
          return Utils.formateDate(text)
        }
      },
      {
        title: '操作',
        width: 150,
        key: 'x',
        render: (text, record) => {
          return <span>
            <a href="javascript:;" onClick={(e) => this.Detail(record, e)} style={{ marginLeft: 10 }}>查看详情</a>          </span >
        }
      },
    ]

    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: this.onSelectChange,
    }


    return (
      <div className="full-height">
        <Card style={{ marginTop: 10 }}>
          <FilterForm supplierList={this.state.supplierList} filterSubmit={this.handleFilter} handleDelete={this.handleDelete} />
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
        <Modal
          title="帖子详情"
          onCancel={this.onCancel}
          visible={this.state.visible}
          footer={false}
        >
          {this.state.visible ? <BBSDetail id={this.state.sendId} /> : ''}
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

    delete = () =>{
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
            <Button onClick={this.delete} type="danger" style={{ marginRight: 10 }}>删除</Button>
          </FormItem>
        </Form>
      )
    }
  }
)