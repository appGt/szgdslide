import React from 'react'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'antd'
import Axios from 'axios';

export default class Body extends React.Component {
  state = {
    list: []
  }
  componentDidMount() {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/listAdvers',
      data: {
        pageNo: 1,
        pageSize: 5,
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
      if (res.status === 200 && res.data.success) {
        let list = res.data.data.result
        list = list.map((item) => {
          return (

            <div className="carousel-item">
              <NavLink to={`/web/new/${item.id}`}><img src={item.path} alt="carousel" /></NavLink>
              <NavLink to={`/web/new/${item.id}`}><p className="text">{item.title}</p></NavLink>
            </div>

          )
        })
        this.setState({
          list
        })
      }
    })
  }
  render() {
    return (
      <Carousel autoplay style={{ float: 'left' }}>
        {this.state.list}
      </Carousel>
    )
  }
}