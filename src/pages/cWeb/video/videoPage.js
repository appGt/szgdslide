import React from 'react'
import { Message, Breadcrumb, List } from 'antd'
import { NavLink } from 'react-router-dom'
import Nav from './../web/nav'
import Top from './../web/top'
import Axios from 'axios';
import './../web/web.less'

export default class VideoPage extends React.Component {
  state = {
    data
  }
  componentWillMount() {
    this.getData()
  }

  params = {
    pageSize: 10,
    pageNo: 1
  }

  getData() {
    Axios({
      method: 'get',
      url: '/szgdslide/admin/listVideo',
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
          <Breadcrumb.Item>视频</Breadcrumb.Item>
        </Breadcrumb>
        <div className="list">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>
                  <NavLink to={"/video/" + item.id}><img src={item.title.imgpath} alt="video" /></NavLink>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}