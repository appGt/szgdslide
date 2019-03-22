import React from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';

export default class Body extends React.Component {
  state = {
    list: []
  }
  componentDidMount() {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/listNews',
      data: {
        pageNo: 1,
        pageSize: 7,
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
        list = list.map((item,i) => {
          return (
            <li key={i}><NavLink to={`/news/${item.id}`}>{item.title}</NavLink></li>
          )
        })
        this.setState({
          list
        })
      }
    })
  }

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}
  render() {
    return (
      <ul>
        {this.state.list}
      </ul>
    )
  }
}