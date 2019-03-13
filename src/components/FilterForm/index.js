import React from 'react'
import { Form, DatePicker, Input, Select, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {
  query = () => {
    const params = this.props.form.getFieldsValue()
    this.props.filterSubmit(params)
  }

  reset = () => {
    this.props.form.resetFields()
    this.props.handleReset()
  }

  delete = ()=>{
    this.props.handleDelete()
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach(item => {
        let { type, label = 'label', field, initialValue, placeholder, width = 80, } = item
        switch (type) {
          case '时间查询':
            let start_time = <FormItem label="按时间范围" key="start_time">
              {
                getFieldDecorator('start_time')(
                  <DatePicker showTime={true} disabledHours format="YYYY-MM-DD" />
                )
              }
            </FormItem>
            formItemList.push(start_time)

            let end_time = <FormItem label="~" key="end_time">
              {
                getFieldDecorator('end_time')(
                  <DatePicker showTime={true} disabledHours format="YYYY-MM-DD" />
                )
              }
            </FormItem>
            formItemList.push(end_time)
            break;
          case 'INPUT':
            let input = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue
                })(
                  <Input placeholder={placeholder} style={{ width }} />
                )
              }
            </FormItem>
            formItemList.push(input)

            break;
          case 'SELECT':
            let SELECT = <FormItem label={label} key={field}>
              {
                getFieldDecorator(field, {
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
          default:
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
          <Button onClick={this.query} type="primary" style={{ marginRight: 10 }}>查询</Button>
          <Button onClick={this.reset} type="default" style={{ marginRight: 10 }}>重置</Button>
          <Button onClick={this.reset} type="danger">删除</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(FilterForm)