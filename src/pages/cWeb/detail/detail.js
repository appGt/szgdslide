import React from 'react'
import { Message,Breadcrumb } from 'antd'
import Nav from './../web/nav'
import Top from './../web/top'
import Axios from 'axios';
import './../web/web.less'
import './detail.less'
import Utils from './../../../utils/utils'
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
        <Breadcrumb style={{marginTop:20}}>
          <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.data.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="article">
          <div >
            <h3 className="title">{this.state.data.title}</h3>
          </div>
          <div className="info">
            <span className="time" style={{ color: '#ccc' }}>
              {Utils.formateDate(this.state.data.time)}
            </span>
          </div>
          <div className="text-content">
            <div dangerouslySetInnerHTML={{ __html: this.state.data.nrcontent }}></div>
          </div>
        </div>
      </div>
    )
  }
}