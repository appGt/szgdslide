import axios from 'axios'
import { Modal } from 'antd';
import Utils from '../utils/utils'
export default class Axios {

  static requestList(_this, url, params) {
    this.ajax({
      url,
      params: params.params,
      loading: true,
    }).then(data => {
      if (data && data.result) {
        let list = data.result.map((item, index) => {
          item.key = index
          return item
        })
        _this.setState({
          list,
          pagination: Utils.pagination(data, (current) => {
            _this.params.page = current
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
    const { url, method='get', params } = options
    let baseURL = 'https://www.easy-mock.com/mock/5c149b721ee30f317685ba15/mockapi'
    return new Promise((resolve, reject) => {
      axios({
        url,
        method,
        params,
        
      }).then((res) => {
        if (options && options.loading) {
          document.querySelector('.loading').style.display = 'none'
        }
        if (res.status === 200) {
          let data = res.data
          if (data.success === true) {
            resolve(data.data)
          } else {
            Modal.warning({
              title: '提示',
              content: data.message || '获取失败'
            })
          }
        } else {
          reject(res.message)
        }
      }).catch((err) => {
        if (options && options.loading) {
          document.querySelector('.loading').style.display = 'none'
        }
        Modal.warning({
          title: '提示',
          content: options.errMsg || '获取失败'
        })
      })
    })
  }
}