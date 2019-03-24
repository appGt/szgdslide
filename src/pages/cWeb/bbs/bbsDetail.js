import React from 'react'
import { Message, Comment, Avatar, Card } from 'antd'
import Axios from 'axios';

export default class BBSDetail extends React.Component {
  state = {
    isLoad: false,
    sendData: {},
    id: '',
    isLogin: false,
  }
  componentWillMount() {
    let id = this.props.sendId
    let isLogin = this.props.isLogin
    this.setState({
      id, isLogin
    })
    this.getSend(id)
  }

  getSend(id) {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailSend',
      data: { id: 3 },
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

  Reply = (item) => {

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
            actions={<span onClick={(e) => this.Reply(item, e)}>回复</span>}
            author={<span>{item.reviewUser.userdesc}</span>}
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
          >
            {
              (item.answers && item.answers.length) ? renderAnswer(item.answers) : ''
            }
          </Comment>
        )
      })
    }
    return commentList
  }

  render() {
    return (
      <div>
        {
          this.state.isLoad ?
            <Card title={this.state.sendData.title}>
              <Comment
                author={<span>{this.state.sendData.user.userdesc}</span>}
                avatar={(
                  <Avatar
                    size="50"
                    style={{ background: '#096dd9' }}
                  >
                    {this.state.sendData.user.userdesc.charAt(0)}
                  </Avatar>
                )}
                content={
                  <div>
                    <p>{this.state.sendData.content}</p>
                    {
                      this.state.sendData.path ? <video src={this.state.sendData.path} style={{ width: '100%' }} /> : ''
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
      </div>
    )
  }
}

function renderAnswer(list) {
  return (
    <div>
      {
        list.map((item, i) => {
          let { fromUser, toUser } = item
          return <Comment
            author={<span>{fromUser.userdesc}</span>}
            avatar={(
              <Avatar
                size="50"
                style={{ background: '#096dd9' }}
              >
                {fromUser.userdesc.charAt(0)}
              </Avatar>
            )}
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