import axios from 'axios'
import { Modal } from 'antd';

export default class Axios {
  static ajax(options) {
    if (options && options.loading) {
      document.querySelector('#loading').style.display = 'block'
    }
    const { url, method, params } = options
    let baseURL = 'https://www.easy-mock.com/mock/5c149b721ee30f317685ba15/mockapi'
    return new Promise((resolve, reject) => {
      axios({
        url,
        method,
        params,
        baseURL
      }).then((res) => {
        if (options && options.loading) {
          document.querySelector('#loading').style.display = 'none'
        }
        if (res.status === 200) {
          if (res.status === true) {
            resolve(res.data)
          } else {
            Modal.warning({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          reject(res.code)
        }
      }).catch((err) => {
        if (options && options.loading) {
          document.querySelector('#loading').style.display = 'none'
        }
        Modal.warning({
          title: '提示',
          content: options.errMsg
        })
      })
    })
  }
}