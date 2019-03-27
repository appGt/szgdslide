import React from 'react'
import { Avatar, Message, Comment, Card } from 'antd'
import Axios from 'axios';
import moment from 'moment'
export default class BBSDetail extends React.Component {
  state = {
    sendData: {},
    id: '',
    newSend: '',
    isLoad: false,
  }
  componentWillMount() {
    let id = this.props.id
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
          isLoad: true,
          sendData: res.data.data,
        })
      }
    }).catch((err) => {
      Message.error('获取数据失败')
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
              (item.answers && item.answers.length) ? renderAnswer(item.answers, item.id, this.Reply) : ''
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
      <div>
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
                        sendData.path ? <video src={sendData.path} style={{ width: '100%' }} controls /> : ''
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
      </div>
    )
  }
}

function renderAnswer(list, reviewId, Reply) {
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

