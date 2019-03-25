import React from 'react'
import { Avatar, Input, Form, Button, Message, Affix, Layout, Upload, Modal, Comment, Card } from 'antd'
import Axios from 'axios';
import UserLogin from './../components/UserLogin'
import UserInfo from './../components/UserInfo'
import CommonHeader from './../components/CommonHeader'
import moment from 'moment'
import './bbs.less'
const TextArea = Input.TextArea
export default class BBSDetail extends React.Component {
  state = {
    isLoad: false,
    sendData: {},
    id: '',
    isLogin: false,
    submitting: false,
    newSend: '',
    //回复
    replyVisible: false,
    reviewId: '',
    tos: {},
    toContent: '',
    replyContent: '',
  }
  componentWillMount() {
    let id = this.props.match.params.id
    this.isLogined()
    this.setState({
      id
    })
    this.getSend(id)
  }

  getSend(id) {
    id = id || this.state.id
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailSend',
      data: { id: id },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          sendData: res.data.data,
          isLoad: true
        })
      }
    }).catch((err) => {
      Message.error('获取数据失败')
    })
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

  isLogined = () => {
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
          this.setState({
            isLogin: isLogin === 'true',
            userData: res.data.data
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  //登录成功
  handleLogin = (userData) => {
    this.setState({
      isLogin: true,
      userData: userData
    })
  }

  handleChange = (e) => {
    this.setState({
      newSend: e.target.value
    })
  }

  addReview = () => {
    if (!this.state.isLogin) {
      Message.error('请先登录')
      return
    }
    let sendId = this.state.id
    let content = this.state.newSend
    this.setState({
      submitting: true
    })
    Axios({
      method: 'post',
      url: '/szgdslide/admin/addReview',
      transformRequest: [(data) => {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: { sendId, content }
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          newSend: '',
          submitting: false
        })
        this.getSend()
      }
    }).catch((err) => {
      Message.error('添加失败')
    })
  }

  Reply = (item) => {
    if (!this.state.isLogin) {
      Message.error('请先登录')
      return
    }
    const { reviewId, tos, toContent } = item
    this.setState({
      replyVisible: true,
      reviewId,
      tos,
      toContent
    })
  }

  onReplyClose = () => {
    this.setState({
      replyVisible: false,
      reviewId: '',
      tos: {},
      replyContent: ''
    })
  }

  onReplySubmit = (e) => {
    let { reviewId, replyContent } = this.state
    let tos = this.state.tos.id
    Axios({
      method: 'post',
      url: '/szgdslide/admin/addAnswer',
      transformRequest: [(data) => {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: { reviewId, content: replyContent, tos }
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.onReplyClose()
        this.getSend()
      }
    }).catch((err) => {
      Message.error('添加失败')
    })
  }

  onReplyChange = (e) => {
    this.setState({
      replyContent: e.target.value
    })
  }

  getCommontList = () => {
    if (!this.state.isLoad) return

    let { sendData } = this.state
    let reviews = sendData.reviews
    let commentList
    if (reviews.length) {
      commentList = reviews.map((item, i) => {
        return (
          <Comment
            actions={[<span style={{ color: '#1890ff' }} onClick={(e) => this.Reply({ 'reviewId': item.id, 'tos': item.reviewUser, 'toContent': item.content }, e)}>回复</span>]}
            author={<span>{item.reviewUser.userdesc}</span>}
            datetime={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}
            avatar={(
              <Avatar
                size="40"
                style={{ background: '#096dd9' }}
              >
                {item.reviewUser.userdesc.charAt(0)}
              </Avatar>
            )}
            content={
              <p>{item.content}</p>
            }
            key={i}
          >
            {
              (item.answers && item.answers.length) ? renderAnswer(item.answers, item.id,this.Reply) : ''
            }
          </Comment>
        )
      })
    }
    return commentList
  }

  render() {
    const { sendData } = this.state
    return (
      <Layout style={{ backgroundColor: '#fff' }}>
        <CommonHeader />
        <div className="send">
          <div className="send-list">
            {
              this.state.isLoad ?
                <Card title={sendData.title}>
                  <Comment
                    author={<span>{sendData.user.userdesc}</span>}
                    avatar={(
                      <Avatar
                        size="50"
                        style={{ background: '#096dd9' }}
                      >
                        {sendData.user.userdesc.charAt(0)}
                      </Avatar>
                    )}
                    datetime={moment(sendData.time).format('YYYY-MM-DD HH:mm:ss')}
                    content={
                      <div>
                        <p>{sendData.content}</p>
                        {
                          sendData.path ? <video src={sendData.path} style={{ width: '100%' }} /> : ''
                        }
                      </div>
                    }
                  >
                  </Comment>
                  {
                    this.getCommontList()
                  }
                </Card> : ''
            }

            <Comment
              avatar={(
                <Avatar
                  src={this.state.isLogin ? '' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                  alt="Han Solo"
                  style={{ background: '#096dd9' }}
                >
                  {this.state.isLogin ? this.state.userData.user.userdesc.charAt(0) : ''}
                </Avatar>
              )}

              content={(
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.addReview}
                  submitting={this.state.submitting}
                  value={this.state.newSend}
                />
              )}
            />
          </div>
          <Affix className="person-info" offsetTop={20} style={{ height: 400, padding: 20 }}>
            <div>
              {
                this.state.isLogin ? <UserInfo userData={this.state.userData} logout={this.logout} /> : <UserLogin handleLogin={this.handleLogin} />
              }
            </div>
          </Affix>
        </div>
        <Modal
          visible={this.state.replyVisible}
          onCancel={this.onReplyClose}
          onOk={this.onReplySubmit}
          title={'回复@ '+this.state.tos.userdesc + ':' + this.state.toContent}
        >
          <TextArea onChange={this.onReplyChange} value={this.state.replyContent} rows={4} />
        </Modal>
      </Layout>

    )
  }
}

function renderAnswer(list, reviewId,Reply) {
  return (
    <div>
      {
        list.map((item, i) => {
          let { fromUser, toUser } = item
          return <Comment
            actions={[<span style={{ color: '#1890ff' }} onClick={(e) =>Reply({ 'reviewId': reviewId, 'tos': fromUser, 'toContent': item.content }, e)}>回复</span>]}
            author={<span>{fromUser.userdesc}</span>}
            avatar={(
              <Avatar
                size="50"
                style={{ background: '#096dd9' }}
              >
                {fromUser.userdesc.charAt(0)}
              </Avatar>
            )}
            datetime={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
            content={
              '回复@ ' + toUser.userdesc + ':' + item.content
            }
            key={i}
          >

          </Comment>
        })
      }
    </div >
  )
}

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          添加评论
      </Button>
      </Form.Item>
    </div>
  );