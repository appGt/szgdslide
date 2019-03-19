import React from 'react'
import { Layout, Icon, Row, Col, Avatar } from 'antd'
import './bbs.less'
import Axios from 'axios';
import Utils from './../../../utils/utils'
const { Sider, Header, Content } = Layout

export default class BBS extends React.Component {
  params = {
    pageSize: 10,
    pageNo: 1,
  }
  colorList = ["#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#34495E", "#F1C40F", "#E67E22", "#E74C3C", "#ECF0F1", "#95A5A6", "#7F8C8D", "#BDC3C7", "#C0392B", "#D35400", "#F39C12", "#2C3E50", "#8E44AD", "#2980B9", "#27AE60", "#16A085"]

  state = {
    sendList: []
  }
  componentWillMount() {
    this.requestSendList()
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
    return list.map((item, i) => {
      let data = {}
      data.name = item.user.userdesc
      data.title = item.title
      data.time = Utils.formateDate(item.time)
      data.num = item.num
      data.avatar = data.name.split('')[0]
      data.color = this.colorList[i]
      return <Send {...data} key={i}/>
    })
  }

  render() {
    return (
      <div className="send">
        <ul className="send-list">
          {this.state.sendList}
        </ul>
        <div className="person-info"></div>

      </div>
    )
  }
}

function Send(props) {
  return (
    <li className="send-item" >
      <Avatar size={50} className="avatar" style={{ backgroundColor: props.color }}>{props.avatar}</Avatar>
      <div className="txt">
        <h3 className="title">{props.title}</h3>
        <p><span className="time">{props.time}</span>  {props.name}</p>
      </div>
      <div className="num">
        <p>{props.num}</p>
        <span>回帖</span>
      </div>
    </li>
  )
}