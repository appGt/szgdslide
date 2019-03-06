import React from 'react'
import { Form, DatePicker, Input, Select, Button } from 'antd'
const FormItem = Form.item

class FilterForm extends React.Component {
  query = () => {
    const params = this.props.form.getFieldsValue()
    this.props.handleSubmit(params)
  }

  reset = () => {
    this.props.handleReset()
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach(item => {
        let { type, label = 'label', filed, initialValue, placeholder, width = 80, } = item
        switch (type) {
          case '日期选择':
            let begin_time = <FormItem>
              {
                getFieldDecorator('begin_time')(
                  <DatePicker showTime={true} placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
            formItemList.push(begin_time)

            let end_time = <FormItem>
              {
                getFieldDecorator('end_time')(
                  <DatePicker showTime={true} placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
            formItemList.push(end_time)
            break;
          case 'INPUT':
            let input = <FormItem label={label} key={filed}>
              {
                getFieldDecorator(filed, {
                  initialValue
                })(
                  <Input placeholder={placeholder} style={{ width }} />
                )
              }
            </FormItem>
            formItemList.push(input)

            break;
          case 'SELECT':
            let SELECT = <FormItem label={label} key={filed}>
              {
                getFieldDecorator(filed, {
                  initialValue
                })(
                  <Select placeholder={placeholder} style={{ width }} >
                    {
                      item.list.map((option) => <Option value={option.id} key={option.id}>{option.name}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
            formItemList.push(SELECT)

            break;
        }
      })
    }
    return formItemList
  }

  render() {
    return (
      <Form layout="inline">
        {
          this.initFormList()
        }
        <FormItem>
          <Button onClick={this.query} style={{ marginRight: 10 }}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(FilterForm)