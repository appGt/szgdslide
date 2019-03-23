import React from 'react'
import { Layout } from 'antd'
import CommonHeader from './../components/CommonHeader'
import SearchBar from './search'
import Axios from 'axios';
import GoodItem from './GoodItem'
import './shop.less'

export default class Shop extends React.Component {
  state = {
    list: []
  }
  componentWillMount() {
    this.requestGoods()
  }
  requestGoods = (name = '') => {
    Axios({
      url: '/szgdslide/admin/listGoods',
      method: 'post',
      data: {
        pageSize: 50,
        pageNo: 1,
        name: name
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
        if (list.length) {
          list = list.map((item, i) => {
            return <GoodItem {...item} key={i} />
          })

          this.setState({
            list
          })
        }
      }
    })
  }

  onSearch = (name) => {
    this.requestGoods(name)
  }
  render() {
    return (
      <Layout style={{ backgroundColor: '#fff' }}>
        <CommonHeader />
        <SearchBar onSearch={this.onSearch} />
        <div className="goodList">
          {
            this.state.list
          }
        </div>
      </Layout>)
  }
}

