import React from 'react'
import { Message, Breadcrumb, List } from 'antd'
import { NavLink } from 'react-router-dom'
import Nav from './../web/nav'
import Top from './../web/top'
import Axios from 'axios';
import './../web/web.less'
import moment from 'moment';

export default class NewsPage extends React.Component {
  state = {
    data
  }

  params = {
    pageSize: 10,
    pageNo: 1
  }
  
  componentWillMount() {
    this.getData()
  }

  getData() {
    Axios({
      method: 'get',
      url: '/szgdslide/admin/listNews',
      params: this.params
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          data: res.data.data.result
        })
      } else {
        Message.error('获取失败')
      }
    }).catch(() => {
      Message.error('获取失败')
    })
  }

  render() {
    const { data } = this.state
    return (
      <div className="web-body">
        <Top />
        <Nav />
        <Breadcrumb style={{ marginTop: 20 }}>
          <Breadcrumb.Item><NavLink to="/">首页</NavLink></Breadcrumb.Item>
          <Breadcrumb.Item>新闻</Breadcrumb.Item>
        </Breadcrumb>
        <div className="list">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<img src={item.path} style={{ width: 150, height: 80 }} />}
                  title={<a href={"/news/" + item.id} target="_blank">{item.title}</a>}
                  description={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}