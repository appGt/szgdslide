import React from 'react'
import { Card, Table, Drawer, Button, Form, Input } from 'antd'
import axios from '../../axios'
import Utils from './../../utils/utils';
import Axios from 'axios';
const FormItem = Form.Item

export default class BBS extends React.Component {

  state = {
    bigImg: '',
    supplierList: [],
    visible: false,
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
    axios.requestList(_this, '/szgdslide/admin/listSends', {
      params: _this.params,
      isShowLoading: true
    })

  }

  handleFilter = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
  }

  Detail = (record) => {
    Axios({
      method: 'post',
      data: {
        id: record.id
      },
      url: '/szgdslide/admin/detailSend',
      transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res)=>{
      if(res.status ===200 &&res.deata.success){

      }
    })
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
        width: 150,
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

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }

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
            rowSelection={rowSelection}
            scroll={{ y: 800 }}
          />
        </div>
        <Drawer
          title="帖子详情"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
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
          <FormItem label="标题" key="title">
            {
              getFieldDecorator('title')(
                <Input placeholder="标题" style={{ width: 150 }} />
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