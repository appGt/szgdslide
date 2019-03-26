import React from 'react'
import { Form, Radio, Button, Input, Message, Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';
import Nav from './../web/nav'
import Top from './../web/top'
const FormItem = Form.Item
const RadioGroup = Radio.Group

class Register extends React.Component {
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        Axios({
          method: 'post',
          url: '/szgdslide/admin/register',
          data: values,
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
            Message.success(`用户${values.username}注册成功`)
          } else {
            Message.error(res.data.message)
          }
        }).catch((err) => {
          console.error(err)
          Message.error('注册失败')
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="web-body">
        <Top />
        <Nav />
        <Breadcrumb style={{ marginTop: 20 }}>
          <Breadcrumb.Item><NavLink to="/">首页</NavLink></Breadcrumb.Item>
          <Breadcrumb.Item>注册</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...formItemLayout} onSubmit={this.onSubmit} style={{ width: 740, marginTop: 100 }}>
          <FormItem label="账号">
            {
              getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '请输入账号'
                }]
              })(
                <Input placeholder="账号" />
              )
            }
          </FormItem>
          <FormItem label="密码">
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码'
                }]
              })(
                <Input type="password" placeholder="密码" />
              )
            }
          </FormItem>
          <FormItem label="昵称">
            {
              getFieldDecorator('userdesc', {
                rules: [{
                  required: true,
                  message: '请输入昵称'
                }]
              })(
                <Input placeholder="昵称" />
              )
            }
          </FormItem>
          <FormItem label="性别">
            {
              getFieldDecorator('sex', {
                rules: [{
                  required: true,
                  message: '请输入昵称'
                }]
              })(
                <RadioGroup  >
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">注册</Button>
          </FormItem>
        </Form>
      </div>

    )
  }
}

export default Form.create({})(Register)