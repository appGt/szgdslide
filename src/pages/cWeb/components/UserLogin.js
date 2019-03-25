import React from 'react'
import { Form, Input, Icon, Button, Message, Avatar } from 'antd'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'


class UserLogin extends React.Component {

  onRigster = () => {
    this.props.history.push('/register')
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.front = true
        Axios({
          method: 'post',
          url: '/szgdslide/admin/login',
          data: values,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res) => {
          if (res.status === 200 && res.data.success) {
            localStorage.setItem('userLogin', 'true')
            this.props.handleLogin(res.data.data)
          } else {
            Message.error(res.data.message || '登录失败')
          }
        }).catch((err) => {
          Message.error('登录失败')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{ border: '1px solid #a7c8efba',padding:20  }}>
        <Avatar size={50} icon="user" style={{ background: "#bfd7f3" }} />
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '输入账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit" className="login-form-button fl">
            登录
          </Button>
          <Button block onClick={this.onRigster}>注册</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(Form.create({})(UserLogin))