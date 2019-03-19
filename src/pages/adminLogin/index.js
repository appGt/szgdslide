import React from 'react'
import './login.less'
import { Form, Button, Input, Icon, Checkbox, Message } from 'antd'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
const FormItem = Form.Item

class AdminLogin extends React.Component {
  state = {
    username: '',
    password: ''
  }
  componentWillMount() {
    this.isRemeber()
    this.islogined()
  }

  islogined = () => {

    Axios({
      url: '/szgdslide/admin/isLogined',
      method: 'get',
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.success === true && res.data.message === '已经登录') {
          localStorage.setItem('isLogin', true)
          this.props.history.push('/admin')
        }
      }
    })
  }

  isRemeber = () => {
    let remember = localStorage.getItem('remember')
    if (remember) {
      remember = JSON.parse(remember)
      this.setState({
        'username': remember.username,
        'password': remember.password
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = this.props.form.getFieldsValue()
        if (data.remember === true) {
          localStorage.setItem('remember', JSON.stringify(data))
        } else {
          localStorage.removeItem('remember')
        }
        var params = new URLSearchParams();
        params.append('username', data.username);
        params.append('password', data.password);
        Axios({
          method: 'post',
          data: params,
          url: '/szgdslide/admin/login'
        }).then((res) => {
          if (res.status === 200) {
            if (res.data.success === true) {
              localStorage.setItem('isLogin', true)
              this.props.history.push('/admin')
            }
          }
        }).catch(() => {
          Message.error('登录失败')
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="admin-login-wrapper">
        <Form onSubmit={this.handleSubmit} className="admin-login">
          <h2>后台管理</h2>
          <FormItem key="username">
            {
              getFieldDecorator('username', {
                initialValue: this.state.username,
                rules: [{ required: true, message: '请输入账号!' }]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )
            }
          </FormItem>
          <FormItem key="password">
            {
              getFieldDecorator('password', {
                initialValue: this.state.password,
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
              )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(AdminLogin))