import React from 'react'
import { Card, Table, Modal, Button, Form, Input } from 'antd'
import axios from '../../axios'
import EditVideo from './editVideo'
const FormItem = Form.Item

export default class Video extends React.Component {

  state = {
    videoPath: '',
    videoVisible: false,
    editVisable: false,
    videoId: ''
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
    axios.requestList(_this, '/szgdslide/admin/listVideos', {
      params: _this.params,
      isShowLoading: true
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

  //取消预览
  handleCancel = () => this.setState({ videoVisible: false, editVisiable: false, videoId: '' })

  //创建
  newVideo = () => {
    this.setState({
      editVisiable: true
    })
  }

  playVideo = (record, e) => {
    this.setState({
      videoVisible: true,
      videoPath: record.path
    })
  }

  onSuc = () => {
    this.requestList()
    this.onCanelEdit()
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
        title: '标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '操作',
        width: 100,
        key: 'x',
        render: (text, record) => {
          return (
            <span>
              <a href="javascript:;" onClick={(e) => this.playVideo(record, e)} style={{ marginLeft: 10 }}>查看视频</a>
            </span >
          )
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
          <Button type="primary" onClick={this.newVideo}>发布新视频</Button>
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
            scroll={{ y: 800 }}
          />
        </div>
        <Modal visible={this.state.videoVisible} footer={null} onCancel={this.handleCancel}>
          <video style={{ width: '100%' }} src={this.state.videoPath} controls />
        </Modal>
        <Modal visible={this.state.editVisiable} footer={null} onCancel={this.handleCancel}>
          {this.state.editVisiable ? <EditVideo videoId={this.state.videoId} onCanelEdit={this.onCanelEdit} onSuc={this.onSuc} /> : ''}
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

    delete = () => {
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
            <Button onClick={this.delete} type="danger">删除</Button>
          </FormItem>
        </Form>
      )
    }
  }
)