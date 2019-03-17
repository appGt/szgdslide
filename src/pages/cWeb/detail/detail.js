import React from 'react'
import { Message } from 'antd'
import Nav from './../web/nav'
import Top from './../web/top'
import Axios from 'axios';
import './../web/web.less'
export default class Detail extends React.Component {
  state = {
    data: {}
  }
  componentWillMount() {
    let type = this.props.match.params.type
    let id = this.props.match.params.id
    this.getData(type, id)
  }

  getData(type, id) {
    switch (type) {
      case 'news':
        this.requestDetail('/szgdslide/admin/detailNew', id)
        break;
      case 'video':
        this.requestDetail('/szgdslide/admin/detailVideo', id)
        break;
      case 'adv':
        this.requestDetail('/szgdslide/admin/detailAdver', id)
        break;
      default:
        break;
    }
  }

  requestDetail(url, id) {
    Axios({
      method: 'post',
      url,
      params: {
        id
      }
    }).then((res) => {
      if (res.status === 200 && res.data.success === true) {
        this.setState({
          data: res.data.data
        })
      }
    }).catch(() => {
      Message.error('获取数据失败')
    })
  }


  render() {
    return (
      <div className="web-body">
        <Top />
        <Nav />
        <div className="title">
          {this.state.data.title}
        </div>
        <div className="info"></div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: this.state.data.nrcontent }}></div>
        </div>
      </div>
    )
  }
}