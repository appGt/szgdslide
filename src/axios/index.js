import axios from 'axios'
import { Message } from 'antd';
import Utils from '../utils/utils'
export default class Axios {

  static requestList(_this, url, params) {
    this.ajax({
      url,
      data: params.params,
      loading: true,
      method: 'post'
    }).then(data => {
      if (data && data.result) {
        let list = data.result.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          list,
          pagination: Utils.pagination(data, (pageNo, pageSize) => {
            _this.params.pageNo = pageNo
            _this.params.pageSize = pageSize
            _this.requestList()
          })
        })
      }
    })
  }

  static ajax(options) {
    if (options && options.loading) {
      document.querySelector('.loading').style.display = 'block'
    }
    const { url, method = 'get', params, data } = options
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
          // 将数据转换为表单数据
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        data: data,
        params
      }).then((res) => {
        if (options && options.loading) {
          document.querySelector('.loading').style.display = 'none'
        }
        if (res.status === 200) {
          let data = res.data
          if (data.success === true) {
            resolve(data.data)
          } else {
            Message.warning(options.errMsg || '获取失败')
          }
        } else {
          reject(res.message)
        }
      }).catch((err) => {
        if (options && options.loading) {
          document.querySelector('.loading').style.display = 'none'
        }
        Message.warning(options.errMsg || '获取失败')
      })
    })
  }
}