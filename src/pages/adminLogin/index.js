import React from 'react'
import './login.less'
import { Form, Button, Input, Icon, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
const FormItem = Form.Item

class AdminLogin extends React.Component {
  componentWillMount() {
    this.isRemeber()
    // this.isLogin()
  }

  islogin = () => {
    
    Axios({
      url: '/admin/isLogined',
      method: 'post',
    }).then((res)=>{
      if(res.status === true){
        localStorage.setItem('isLogin', true)
        // this.props.history.push('/')
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
        let params = this.props.form.getFieldsValue()
        if (params.remember === true) {
          localStorage.setItem('remember', JSON.stringify(params))
        }
        this.props.history.push('/')
        // Axios({
        //   url: '/admin/login',
        //   method: 'post',
        //   params: params
        // }).then((res)=>{
        //   if(res.status === true){
        //     localStorage.setItem('isLogin', true)
        //     // this.props.history.push('/')
        //   }
        // })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="admin-login-wrapper">
        <Form onSubmit={this.handleSubmit} className="admin-login">
          <h2>后台管理</h2>
          <FormItem>
            {
              getFieldDecorator('username', {
                initialValue: this.state.username,
                rules: [{ required: true, message: '请输入账号!' }]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )
            }
          </FormItem>
          <FormItem>
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