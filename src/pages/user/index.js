import React from 'react'
import { Card, Table, Button, Form, Input, message } from 'antd'
import axios from '../../axios'
import Utils from './../../utils/utils';
import Axios from 'axios'
const FormItem = Form.Item

export default class User extends React.Component {

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
    axios.requestList(_this, '/szgdslide/admin/listUsers', {
      params: _this.params,
      isShowLoading: true
    })

  }

  handleFilter = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
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
      url: '/szgdslide/admin/deteleUser',
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

   //选中
   onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '描述',
        dataIndex: 'userdesc',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text, record) => {
          return text === '男' ? '男' : '女'
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return Utils.formateDate(text)
        }
      },
      {
        title: '角色',
        dataIndex: 'roleId',
        key: 'roleId',
        render: (roleId, record) => {
          return roleId === 1 ? '管理员' : '普通用户'
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
          />
        </div>
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
          <FormItem label="用户名" key="username">
            {
              getFieldDecorator('username')(
                <Input placeholder="用户名" style={{ width: 150 }} />
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