import React from 'react'
import { Message, Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
import Nav from './../web/nav'
import Top from './../web/top'
import Axios from 'axios';
import './../web/web.less'
import './detail.less'
import Utils from './../../../utils/utils'
export default class Detail extends React.Component {
  state = {
    data: {},
    type: 'news',
    id: ''
  }
  componentWillMount() {
    let type = this.props.match.params.type
    let id = this.props.match.params.id
    this.getData(type, id)
    this.setState({
      type, id
    })
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
      data: {
        id,
        browes: 1
      },
      transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
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
        <Breadcrumb style={{ marginTop: 20 }}>
          <Breadcrumb.Item><NavLink to="/">首页</NavLink></Breadcrumb.Item>
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
          <div className="text-content" style={{ paddingTop: 20 }}>
            {
              this.state.type === 'video' ? <video src={this.state.data.path} poster={this.state.data.imgpath} controls width={'100%'} /> :
                <div dangerouslySetInnerHTML={{ __html: this.state.data.nrcontent }}></div>
            }
          </div>
        </div>
      </div>
    )
  }
}