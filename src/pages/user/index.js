import React from 'react'
import { Card, Table, Modal, Button, Form, Input } from 'antd'
import axios from '../../axios'
import Utils from './../../utils/utils';
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

    return (
      <div className="full-height">
        <Card style={{ marginTop: 10 }}>
          <FilterForm supplierList={this.state.supplierList} filterSubmit={this.handleFilter} handleReset={this.handleReset} />
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            // scroll={{ y: 800 }}
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
          </FormItem>
        </Form>
      )
    }
  }
)