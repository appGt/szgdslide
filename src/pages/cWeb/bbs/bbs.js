import React from 'react'
import { Avatar, Drawer, Input, Form, Button, Message, Affix, Layout, Upload, Modal } from 'antd'
import BBSDetail from './bbsDetail'
import Axios from 'axios';
import Utils from './../../../utils/utils'
import UserLogin from './../components/UserLogin'
import UserInfo from './../components/UserInfo'
import CommonHeader from './../components/CommonHeader'
import './bbs.less'
export default class BBS extends React.Component {
  params = {
    pageSize: 10,
    pageNo: 1,
  }
  colorList = ["#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#34495E", "#F1C40F", "#E67E22", "#E74C3C", "#ECF0F1", "#95A5A6", "#7F8C8D", "#BDC3C7", "#C0392B", "#D35400", "#F39C12", "#2C3E50", "#8E44AD", "#2980B9", "#27AE60", "#16A085"]

  state = {
    sendList: [],
    visible: false,
    bbsVisible: false,
    loginVisable: false,
    userData: {},
    isLogin: false,
    sendId: ''
  }
  componentWillMount() {
    this.isLogined()
    this.requestSendList()
  }

  isLogined = () => {
    let _this = this
    let isLogin = localStorage.getItem('userLogin')
    if (isLogin === 'true') {
      Axios({
        method: 'get',
        url: '/szgdslide/admin/isLogined',
        params: { front: true },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.status === 200 && res.data.success) {
          _this.setState({
            isLogin: isLogin === 'true',
            userData: res.data.data
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  logout = () => {
    Axios({
      method: 'get',
      url: '/szgdslide/admin/logout',
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          isLogin: false,
          userData: {}
        })
        localStorage.removeItem('userLogin')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  addNewSend = () => {
    if (!this.state.isLogin) {
      Message.error('请先登录')
      return
    }
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  SubmitSend = (data) => {
    let _this = this
    data.sednId = 1
    return new Promise((resolve, reject) => {
      Axios({
        method: 'post',
        url: '/szgdslide/admin/addSend',
        data: data,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.status === 200 && res.data.success) {
          Message.success('发布成功')
          _this.setState({
            visible: false,
          })
          _this.requestSendList()
          resolve({ status: true })
        } else {
          Message.error('发布失败')
          reject({ status: false })
        }
      }).catch((err) => {
        reject({ status: false })
      })
    })
  }

  //登录成功
  handleLogin = (userData) => {
    this.setState({
      isLogin: true,
      userData: userData
    })
  }

  requestSendList() {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/listSends',
      params: this.params
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        let list = res.data.data.result;
        let sendList = this.getSendList(list)
        this.setState({
          list,
          sendList
        })
      }
    })
  }

  getSendList = (list) => {
    return list.map((Item, i) => {
      let data = {}
      data.name = Item.user.userdesc
      data.title = Item.title
      data.time = Utils.formateDate(Item.time)
      data.num = Item.num
      data.avatar = data.name.split('')[0]
      data.color = this.colorList[i]
      data.id = Item.id
      return <Send {...data} key={i} onDetail={this.onDetail} />
    })
  }

  onDetail = (sendId) => {
    this.setState({
      bbsVisible: true,
      sendId: sendId
    })
  }

  onDetailClose = () => {
    this.setState({
      bbsVisible: false,
      sendId: ''
    })
  }

  render() {
    return (
      <Layout style={{ backgroundColor: '#fff' }}>
        <CommonHeader />
        <div className="send">
          <ul className="send-list">
            <Button onClick={this.addNewSend} style={{ marginBottom: 20 }}>发布新主题</Button>
            {this.state.sendList}
          </ul>
          <Affix className="person-info">
            <div>
              {
                this.state.isLogin ? <UserInfo userData={this.state.userData} logout={this.logout} /> : <UserLogin handleLogin={this.handleLogin} />
              }
            </div>
          </Affix>
          <Drawer
            title="新帖子"
            placement="bottom"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            height="500"
          >
            <BottomForm onSubmit={this.SubmitSend} />
          </Drawer>
        </div>
        <Modal
          visible={this.state.bbsVisible}
          onCancel={this.onDetailClose}
          footer={false}
          width={800}
          height="100%"
        >
          {
            this.state.bbsVisible ? <BBSDetail sendId={this.state.sendId} /> : ''
          }
        </Modal>
      </Layout>
    )
  }
}

const BottomForm = Form.create({})(
  class Content extends React.Component {
    state = { path: '', loading: false }
    onSubmit = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.path = this.state.path
          this.props.onSubmit(values).then((res) => {
            this.props.form.setFieldsValue({
              title: '',
              content: ''
            })
          })
        }
      })
    }
    onUpload = (info) => {
      if (info.file.status !== 'uploading') {
        this.setState({
          loading: true
        })
      }
      if (info.file.status === 'done' && info.file.response.success === true) {
        Message.success(`${info.file.name} 上传成功`);
        this.setState({
          path: '/szgdslide/files/' + info.file.name,
          loading: false
        })
      } else if (info.file.status === 'error') {
        Message.error(`${info.file.name} 上传失败.`);
        this.setState({
          path: '',
          loading: false
        })
      }
    }
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <Form>
          <Form.Item className="Item" label="标题">
            {
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题'
                  }
                ]
              })(
                <Input placeholder="标题" />
              )
            }
          </Form.Item>
          <Upload
            name="files"
            action='/szgdslide/upload'
            showUploadList={false}
            onChange={
              this.onUpload
            }
          >
            <Button type="primary" icon={this.state.loading ? 'loading' : 'upload'} loading={this.state.loading}>
              上传视频
        </Button>
          </Upload>
          <Form.Item className="Item" label="描述">
            {
              getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入描述'
                  }
                ]
              })(<Input.TextArea rows={4} placeholder="描述" />)
            }
          </Form.Item>
          <Form.Item>
            <Button onClick={this.onSubmit}>发布</Button>
          </Form.Item>
        </Form>
      )

    }
  }
)


function Send(props) {
  return (
    <li className="send-item" >
      <Avatar
        size={50}
        className="avatar"
        style={{ backgroundColor: props.color }}
      >
        {props.avatar}
      </Avatar>
      <div className="txt">
        <h3
          className="title"
          style={{
            cursor: 'pointer',
            color: '#1890ff'
          }}
          onClick={
            (e) => props.onDetail(props.id, e)
          }
        >
          {props.title}
        </h3>
        <p><span className="time">{props.time}</span>  {props.name}</p>
      </div>
      <div className="num">
        <p>{props.num}</p>
        <span>回帖</span>
      </div>
    </li>
  )
}